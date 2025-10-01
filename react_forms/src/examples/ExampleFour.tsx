import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const ExampleFour = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert("Form submitted:\n" + JSON.stringify(data, null, 2));
  };

  const handleNext = async () => {
    // Validate current step fields
    let stepFields: (keyof FormData)[] = [];
    if (step === 1) stepFields = ["firstName", "lastName"];
    if (step === 2) stepFields = ["email", "password"];

    const isStepValid = await trigger(stepFields);

    if (isStepValid) {
      setStep(step + 1);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Multi-Step Form Example</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <label>First Name:</label>
            <input
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <p style={{ color: "red" }}>{errors.firstName.message}</p>
            )}

            <label>Last Name:</label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName.message}</p>
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}

            <label>Password:</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ marginTop: "20px" }}>
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}

          {step < 2 && (
            <button
              type="button"
              onClick={handleNext}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          )}

          {step === 2 && (
            <button type="submit" style={{ marginLeft: "10px" }}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
