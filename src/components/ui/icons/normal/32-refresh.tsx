import { type HTMLAttributes } from "react"; //https://heroicons.com/outline arrow-path-rounded-square
import { classNames } from "@/utils";

export function IconRefresh({ className, title, ...rest }: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-none stroke-current stroke-[1.5]", className)} viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 12-.1-3.7a4 4 0 0 0-3.7-3.7 49 49 0 0 0-7.4 0 4 4 0 0 0-3.7 3.7V9m14.9 3 3-3m-3 3-3-3m-12 3 .1 3.7a4 4 0 0 0 3.7 3.7 49 49 0 0 0 7.4 0 4 4 0 0 0 3.7-3.7V15M4.5 12l3 3m-3-3-3 3" />
        </svg>
    );
}
