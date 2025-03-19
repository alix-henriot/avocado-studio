"use client"
import React, { useState, useEffect } from 'react'

interface Category {
  id: number
  value: string
}

function PortfolioPage() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!file || !title || !categoryId) {
            setError('Please fill in all required fields (Title, Category, and File)');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("categoryId", categoryId);

        try {
            const response = await fetch('/api/portfolio', {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');
            
            const data = await response.json();
            console.log('Upload successful:', data);
            // Reset form on success
            setFile(null);
            setTitle('');
            setDescription('');
            setCategoryId('');
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

  return (
    <main className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Upload Image to Portfolio</h1>
            
            {error && <div className="text-red-500 p-2 rounded bg-red-50">{error}</div>}

            <div>
                <label className="block mb-2 font-medium">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded h-24"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.value}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Image File <span className="text-red-500">*</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button
            type="submit"
                disabled={!file || !title || !categoryId || uploading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
        </form>
    </main>
  )
}

export default PortfolioPage