import { useState, useEffect } from 'react';
import { cmsAPI, categoriesAPI } from '@/lib/api';
import type { NavigationMenu, SiteSettings } from '@/types/cms';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
}

interface MegaMenuSettings {
    description_text: string;
    sale_badge_text: string;
    sale_badge_label: string;
    show_sale_badge: boolean;
}

interface MegaMenuCategory {
    id: number;
    category_name: string;
    category_slug: string;
    category_image: string;
    order: number;
}

export function useHeaderData() {
    const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
    const [navigation, setNavigation] = useState<NavigationMenu[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [megaMenuSettings, setMegaMenuSettings] = useState<MegaMenuSettings | null>(null);
    const [megaMenuCategories, setMegaMenuCategories] = useState<MegaMenuCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const [settingsRes, navRes, categoriesRes, megaMenuSettingsRes, megaMenuCategoriesRes] = await Promise.all([
                    cmsAPI.getSiteSettings().catch(() => ({ data: null })),
                    cmsAPI.getNavigation().catch(() => ({ data: { results: [] } })),
                    categoriesAPI.getAll().catch(() => ({ data: { results: [] } })),
                    cmsAPI.getMegaMenuSettings().catch(() => ({ data: null })),
                    cmsAPI.getMegaMenuCategories().catch(() => ({ data: { results: [] } })),
                ]);

                setSiteSettings(settingsRes.data);
                setNavigation(navRes.data.results || navRes.data || []);
                setCategories(categoriesRes.data.results || categoriesRes.data || []);
                setMegaMenuSettings(megaMenuSettingsRes.data);
                setMegaMenuCategories(megaMenuCategoriesRes.data.results || megaMenuCategoriesRes.data || []);
            } catch (error) {
                console.error('Failed to fetch header data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeaderData();
    }, []);

    return {
        siteSettings,
        navigation,
        categories,
        megaMenuSettings,
        megaMenuCategories,
        loading,
    };
}
