import { JSX, SVGProps } from 'react';

export function RSSIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
            <path d="M9.565 26.319c0-2.161-1.752-3.913-3.912-3.913s-3.913 1.752-3.913 3.913c0 2.161 1.752 3.913 3.913 3.913s3.912-1.752 3.912-3.913zM20.651 30.231h-5.543c0-7.383-5.985-13.368-13.368-13.368v-5.543c10.444 0 18.911 8.467 18.911 18.911v0zM24.563 30.231c0-12.605-10.218-22.823-22.823-22.823v-5.706c15.756 0 28.529 12.773 28.529 28.529h-5.706z"></path>
        </svg>
    );
}
