import { useTranslations } from 'next-intl';

import { InfoTooltip } from '@/components/shared/info-tooltip';
import { Social } from '@/components/shared/social';
import { socialMediaLinks } from '@/lib/constants';

export const Socials = () => {
    const t = useTranslations('Home');
    return (
        <section className="my-8 w-full space-y-5">
            {socialMediaLinks.map((category) => (
                <div key={t(category.name)} className="space-y-2">
                    <h3 className="text-muted-foreground text-lg font-semibold capitalize">
                        {t(category.name)}
                    </h3>

                    <div className="flex flex-row space-x-2 overflow-x-auto">
                        {category.items.map((social) => (
                            <InfoTooltip
                                key={social.name}
                                label={social.name}
                                side="bottom"
                                className="text-xs"
                            >
                                <Social
                                    key={social.name}
                                    href={social.href}
                                    name={social.name}
                                    Icon={social.icon}
                                    iconClassName="size-5 md:size-6"
                                />
                            </InfoTooltip>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};
