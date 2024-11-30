import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface ButtonWithIconProps {
  loading: boolean;
  className?: string;
  text?: string;
  [key: string]: any;
}

export default function LoadingButton({
  loading,
  className,
  text = "Submit",
  ...rest
}: ButtonWithIconProps) {
  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <Button type="submit" disabled className={className} {...rest}>
          {text}

          <Loader className="self-center ml-2 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className={className} {...rest}>
          {text}
        </Button>
      )}
    </div>
  );
}
