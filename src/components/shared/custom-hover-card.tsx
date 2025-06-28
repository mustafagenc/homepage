import { ArrowUpRightIcon } from '@/components/icons/arrowUpRight';
import { CalendarIcon } from '@/components/icons/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface CustomHoverCardProps {
    triggerText: string;
    title: string;
    description: string;
    dateText?: string;
    extenalLink?: string;
    avatarSrc: string;
    avatarFallback: string;
    className?: string;
}

export const CustomHoverCard = ({
    triggerText,
    title,
    description,
    dateText,
    extenalLink,
    avatarSrc,
    avatarFallback,
    className = 'mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4',
}: CustomHoverCardProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger
                asChild
                tabIndex={0}
                className={cn(
                    'mx-1 cursor-pointer underline decoration-zinc-400 decoration-2 underline-offset-4',
                    className
                )}
            >
                <span>{triggerText}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-96 font-medium">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={avatarSrc} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{title}</h4>
                        <p className="m-0 text-sm text-pretty">{description}</p>
                        {dateText && (
                            <div className="flex items-center pt-2">
                                <div className="flex flex-auto items-center">
                                    <CalendarIcon className="mr-2 size-4" />
                                    <span className="text-muted-foreground text-xs">
                                        {dateText}
                                    </span>
                                </div>
                                {extenalLink && (
                                    <a
                                        href={extenalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={title}
                                    >
                                        <ArrowUpRightIcon className="ml-4 size-4 flex-none" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
