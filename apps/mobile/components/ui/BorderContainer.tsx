import {VStack} from "@/components/ui/vstack";

export function BorderContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <VStack className={`bg-white/70 rounded-[30px] border border-white backdrop-blur-3xl ${className}`}>
            {children}
        </VStack>
    );
}