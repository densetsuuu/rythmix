import {VStack} from "@/components/ui/vstack";

export function BorderContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <VStack className={`backdrop-blur-3xl ${className}`}>
            {children}
        </VStack>
    );
}