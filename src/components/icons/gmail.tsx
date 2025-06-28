import { JSX, SVGProps } from 'react';

export function GmailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
            <path d="M14.5 2h-13A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm-1.766 1L8 6.738 3.266 3h9.468zM2 13V4.646l6 4.615 6-4.616V13H2z"></path>
        </svg>
    );
}
