export interface TimelineSettings {
    scale: number; // Scale factor for time display (1 = normal, 2 = compressed, etc.)
    filterText: string; // Text to filter events by
    showTimestamps: boolean; // Whether to show timestamps
    compactView: boolean; // Whether to use compact view
    autoRefresh: boolean; // Whether to automatically refresh events
}

export interface TimelineEvent {
    id: string;
    content: string;
    created_at: number;
    fileName: string;
    author: string;
    isNew: boolean;
    reply_to?: string;
}

export const DEFAULT_SETTINGS: TimelineSettings = {
    scale: 2, // Start with 'Relaxed' view
    filterText: '',
    showTimestamps: true,
    compactView: true, // Start with compact view for better readability
    autoRefresh: true
};
