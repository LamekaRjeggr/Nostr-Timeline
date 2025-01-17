import { Plugin } from 'obsidian';
import { NostrTimelineView, VIEW_TYPE_TIMELINE } from './views/TimelineView';
import { NostrTimelineSettingTab } from './settings/SettingsTab';
import { TimelineSettings, DEFAULT_SETTINGS } from './types';

export default class NostrTimelinePlugin extends Plugin {
    settings: TimelineSettings;
    private view: NostrTimelineView | null = null;

    async onload() {
        await this.loadSettings();

        // Register View
        this.registerView(
            VIEW_TYPE_TIMELINE,
            (leaf) => {
                this.view = new NostrTimelineView(leaf, this.settings);
                return this.view;
            }
        );

        // Add ribbon icon
        this.addRibbonIcon('clock', 'Nostr Timeline', () => {
            this.activateView();
        });

        // Add settings tab
        this.addSettingTab(new NostrTimelineSettingTab(this.app, this));

        // Add command to open timeline
        this.addCommand({
            id: 'open-nostr-timeline',
            name: 'Open Nostr Timeline',
            callback: () => {
                this.activateView();
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async activateView() {
        const { workspace } = this.app;
        
        // Check for existing view
        const existingLeaf = workspace.getLeavesOfType(VIEW_TYPE_TIMELINE)[0];
        if (existingLeaf) {
            workspace.revealLeaf(existingLeaf);
            return;
        }

        // Create new leaf
        const newLeaf = workspace.getRightLeaf(false);
        if (!newLeaf) return;

        await newLeaf.setViewState({
            type: VIEW_TYPE_TIMELINE,
            active: true,
        });
        workspace.revealLeaf(newLeaf);
    }

    // Method to refresh the timeline
    async refreshTimeline() {
        if (this.view) {
            await this.view.refresh();
        }
    }
}
