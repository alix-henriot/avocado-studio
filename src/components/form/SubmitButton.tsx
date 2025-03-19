import { Button } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export function SubmitButton() {
  const { formState } = useFormContext();
  const { isValid, isSubmitting } = formState;

  return isValid ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <Button
        type="submit"
        color="success"
        className="w-full"
        isLoading={isSubmitting}
      >
        Get a quote
      </Button>
    </motion.div>
  ) : null;
}