"use client";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ServiceSelection } from "@/components/form/ServiceSelection";
import { ShootingDetails } from "@/components/form/ShootingDetails";
import { LocationDate } from "@/components/form/LocationDate";
import { SettingsSection } from "@/components/form/SettingsSection";
import { ContactInfo } from "@/components/form/ContactInfo";
import { SubmitButton } from "@/components/form/SubmitButton";

export type FormValues = {
  service: number;
  material: number;
  editing: boolean;
  quantity: number;
  city: string;
  longitude: number;
  latitude: number;
  setting: string[];
  name: string;
  company: string;
  email: string;
  date: string;
};

function FormPage() {
  const router = useRouter();
  const methods = useForm<FormValues>({ mode: "onChange" });
  const { handleSubmit, watch } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service_id: Number(data.service),
          material_id: Number(data.material),
          setting: data.setting.map(Number),
          editing_id: data.editing ? 2 : 1
        })
      });

      if (!response.ok) throw new Error('Submission failed');
      
      const responseData = await response.json();
      router.push(`/quote/${responseData.quoteId}`);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const [shootingTypeValue, materialValue, settingValue] = watch([
    "service", "material", "setting"
  ]);

  return (
    <main className="min-h-screen">
      {/* <Nav /> */}
      <div className="container p-8 mx-auto md:max-w-2xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
              <ServiceSelection />
            </FormSection>

            {shootingTypeValue && materialValue && (
              <FormSection>
                <ShootingDetails materialValue={materialValue} />
                <LocationDate />
                <SettingsSection />
              </FormSection>
            )}

            {settingValue?.length > 0 && (
              <FormSection>
                <ContactInfo />
              </FormSection>
            )}

            <SubmitButton />
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid grid-flow-row gap-4 mb-6"
  >
    {children}
  </motion.div>
);

export default FormPage;