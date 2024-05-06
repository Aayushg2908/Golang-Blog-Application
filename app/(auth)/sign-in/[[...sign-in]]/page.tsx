import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      appearance={{
        variables: {
          colorPrimary: "#FFA500",
        },
      }}
    />
  );
}
