import { App, PluginSettingTab, Setting } from 'obsidian';
import type NostrTimelinePlugin from '../main';
import type { TimelineSettings } from '../types';

export class NostrTimelineSettingTab extends PluginSettingTab {
    plugin: NostrTimelinePlugin;

    constructor(app: App, plugin: NostrTimelinePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: 'Nostr Timeline Settings'});

        new Setting(containerEl)
            .setName('Default Time Scale')
            .setDesc('Set the default time scale for the timeline view')
            .addSlider(slider => slider
                .setLimits(0.5, 5, 0.5)
                .setValue(this.plugin.settings.scale)
                .onChange(async (value) => {
                    this.plugin.settings.scale = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Show Timestamps')
            .setDesc('Show timestamps on timeline events by default')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showTimestamps)
                .onChange(async (value) => {
                    this.plugin.settings.showTimestamps = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Compact View')
            .setDesc('Use compact view by default')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.compactView)
                .onChange(async (value) => {
                    this.plugin.settings.compactView = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Auto Refresh')
            .setDesc('Automatically refresh timeline when new events arrive')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoRefresh)
                .onChange(async (value) => {
                    this.plugin.settings.autoRefresh = value;
                    await this.plugin.saveSettings();
                }));
    }
}
