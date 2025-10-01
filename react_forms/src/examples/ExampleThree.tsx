import { useForm } from "react-hook-form";

// npm install react-hook-form

// React Hook Form - using useForm

export const ExampleThree = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <h1>React hook form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
