import { useState } from "react";
import { useForm } from "react-hook-form";

// Multi-step form using useForm

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const ExampleFour = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const handleNext = async () => {
    let stepFields: (keyof FormData)[] = [];
    if (step === 1) stepFields = ["firstname", "lastname"];
    if (step === 2) stepFields = ["email", "password"];

    const isValid = await trigger(stepFields);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <h1>Multi-step form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {step === 1 && (
          <>
            <label htmlFor="firstname">First Name</label>
            <input type="text" {...register("firstname")} />
            {errors.firstname && <p>{errors.firstname.message}</p>}
            <label htmlFor="lastname">Last Name</label>
            <input type="text" {...register("lastname")} />
            {errors.lastname && <p>{errors.lastname.message}</p>}
          </>
        )}
        {step === 2 && (
          <>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </>
        )}

        {step === 1 && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}
        {step === 2 && <button type="submit">Submit</button>}
      </form>
    </>
  );
};
