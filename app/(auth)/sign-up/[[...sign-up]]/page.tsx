import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      appearance={{
        variables: {
          colorPrimary: "#FFA500",
        },
      }}
    />
  );
}
