import { InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import { ExtractProps } from "@/lib/utils";

export function PasswordInput({ ...props }: ExtractProps<typeof InputField>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputField
        type={showPassword ? "text" : "password"}
        {...props}
      ></InputField>
      <InputSlot
        className="pr-3"
        onPress={() => {
          setShowPassword(!showPassword);
        }}
      >
        <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="white" size="" />
      </InputSlot>
    </>
  );
}
