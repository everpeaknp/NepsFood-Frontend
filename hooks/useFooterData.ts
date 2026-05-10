import { useState, useEffect } from 'react';
import { cmsAPI } from '@/lib/api';
import type { FooterColumn, SiteSettings } from '@/types/cms';

export function useFooterData() {
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
    const [footerColumns, setFooterColumns] = useState<FooterColumn[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const [settingsRes, footerRes] = await Promise.all([
                    cmsAPI.getSiteSettings().catch(() => ({ data: null })),
                    cmsAPI.getFooterColumns().catch(() => ({ data: { results: [] } })),
                ]);

                setSiteSettings(settingsRes.data);
                setFooterColumns(footerRes.data.results || footerRes.data || []);
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, []);

    return {
        siteSettings,
        footerColumns,
        loading,
    };
}
