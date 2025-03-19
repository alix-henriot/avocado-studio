import 'dotenv/config';
import { db } from '@/db';
import { image, category } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const region = process.env.NEXT_PUBLIC_AWS_S3_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY;
const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error('Missing AWS S3 environment variables');
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});



async function uploadFileToS3(fileBuffer: Buffer, fileName: string): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg',
    };
  
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    // Return full public URL
    return `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(fileName)}`;
  }
  
  export async function POST(request: NextRequest) {
    try {
      const formData = await request.formData();
      
      // Extract form fields
      const file = formData.get('file') as File;
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const categoryId = formData.get('categoryId') as string;
  
      // Validation
      if (!file || !title || !categoryId) {
        return NextResponse.json(
          { error: 'Missing required fields (file, title, categoryId)' },
          { status: 400 }
        );
      }
  
      // Upload to S3
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileUrl = await uploadFileToS3(buffer, file.name);
  
      // Insert into database
      const newImage = await db.insert(image).values({
        title,
        description,
        url: fileUrl,
        categoryId: parseInt(categoryId),
      }).$returningId();
  
      return NextResponse.json({ 
        success: true, 
        url: fileUrl,
        image: newImage[0]
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: 'Error processing upload' },
        { status: 500 }
      );
    }
  }
  

  export async function GET() {
    try {
      const categoriesResult = await db
        .select({ value: category.value })
        .from(category);
        
      const categories = categoriesResult.map(c => c.value);
  
      const imagesResult = await db
        .select({
          id: image.id,
          title: image.title,
          description: image.description,
          url: image.url,
          categoryValue: category.value
        })
        .from(image)
        .innerJoin(category, eq(image.categoryId, category.id));
  
      const items = imagesResult.map(img => ({
        src: img.url,
        alt: img.title,
        category: img.categoryValue,
        title: img.title,
        description: img.description,
      }));
  
      return NextResponse.json({ categories, items });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch portfolio data' },
        { status: 500 }
      );
    }
  }