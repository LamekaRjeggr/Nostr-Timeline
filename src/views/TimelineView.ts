import { ItemView, WorkspaceLeaf, TFile } from 'obsidian';
import type { TimelineSettings, TimelineEvent } from '../types';

export const VIEW_TYPE_TIMELINE = "nostr-timeline-view";

export class NostrTimelineView extends ItemView {
    private container: HTMLElement;
    private timelineEl: HTMLElement;
    private settings: TimelineSettings;
    private events: TimelineEvent[] = [];

    constructor(leaf: WorkspaceLeaf, settings: TimelineSettings) {
        super(leaf);
        this.settings = settings;
    }

    getViewType(): string {
        return VIEW_TYPE_TIMELINE;
    }

    getDisplayText(): string {
        return "Nostr Timeline";
    }

    async onOpen(): Promise<void> {
        // Create main container
        this.container = this.containerEl.children[1] as HTMLElement;
        this.container.empty();
        this.container.addClass('nostr-timeline-container');

        // Create timeline content container
        this.timelineEl = this.container.createDiv('timeline-events');

        // Register for file changes
        this.registerEvent(
            this.app.metadataCache.on('changed', async (file: TFile) => {
                if (file.path.startsWith('nostr/notes/') && 
                    file.extension === 'md') {
                    await this.loadNostrNotes();
                    this.updateTimelineDisplay();
                }
            })
        );

        this.registerEvent(
            this.app.vault.on('create', async (file: TFile) => {
                if (file.path.startsWith('nostr/notes/') && 
                    file.extension === 'md') {
                    await this.loadNostrNotes();
                    this.updateTimelineDisplay();
                }
            })
        );

        this.registerEvent(
            this.app.vault.on('delete', async (file: TFile) => {
                if (file.path.startsWith('nostr/notes/') && 
                    file.extension === 'md') {
                    await this.loadNostrNotes();
                    this.updateTimelineDisplay();
                }
            })
        );

        await this.loadNostrNotes();
        this.updateTimelineDisplay();
    }

    private async loadNostrNotes() {
        const files = this.app.vault.getFiles();
        const nostrNotes = files.filter(file => 
            file.path.startsWith('nostr/notes/') && 
            file.extension === 'md'
        );

        this.events = [];

        for (const file of nostrNotes) {
            const cache = this.app.metadataCache.getFileCache(file);
            if (cache?.frontmatter?.created) {
                const timestamp = cache.frontmatter.created;
                if (typeof timestamp !== 'number') continue;
                
                this.events.push({
                    id: file.basename,
                    content: cache.frontmatter.content || file.basename,
                    created_at: timestamp,
                    fileName: file.path,
                    author: (cache.frontmatter.author || 'Unknown').replace(/[\[\]]/g, ''), // Remove any brackets
                    isNew: false,
                    reply_to: cache.frontmatter.reply_to || null
                });
            }
        }

        // Sort by creation time, newest first
        this.events.sort((a, b) => b.created_at - a.created_at);
    }

    private updateTimelineDisplay() {
        this.timelineEl.empty();

        // Create timeline container
        const timelineContainer = this.timelineEl.createDiv('timeline-container');
        
        // Add events
        this.events.forEach((event) => {
            const eventEl = this.createEventElement(event);
            timelineContainer.appendChild(eventEl);
        });
    }

    private createEventElement(event: TimelineEvent): HTMLElement {
        const eventEl = document.createElement('div');
        eventEl.className = 'timeline-event';
        
        // Get file cache for root/reply info
        const file = this.app.vault.getAbstractFileByPath(event.fileName);
        if (file instanceof TFile) {
            const cache = this.app.metadataCache.getFileCache(file);
            
            // Check for root note in frontmatter
            if (cache?.frontmatter?.root) {
                eventEl.classList.add('has-root');
                const rootLabel = eventEl.createDiv('branch-label root-label');
                rootLabel.setText('Root');
                const rootPreview = eventEl.createDiv('preview-bubble root-preview');
                rootPreview.setText(typeof cache.frontmatter.root === 'string' ? 
                    cache.frontmatter.root : 'Root note');
            }

            // Check for reply_to in frontmatter
            if (cache?.frontmatter?.reply_to) {
                eventEl.classList.add('has-replies');
                const replyLabel = eventEl.createDiv('branch-label reply-label');
                replyLabel.setText('reply');
                const replyPreview = eventEl.createDiv('preview-bubble reply-preview');
                replyPreview.setText(cache.frontmatter.reply_to);
            }
        }

        // Create content container
        const content = eventEl.createDiv('event-content');

        // Add timestamp and author
        const header = content.createDiv('event-header');
        
        const timestamp = header.createDiv('event-timestamp');
        const date = new Date(event.created_at * 1000);
        const formattedDate = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(',', ' at');
        timestamp.setText(formattedDate);

        const author = header.createEl('a', {
            cls: 'event-author',
            text: event.author,
            href: `nostr/profiles/${event.author}.md`
        });
        author.addEventListener('click', (e) => {
            e.stopPropagation();
            this.app.workspace.openLinkText(`nostr/profiles/${event.author}.md`, '', true);
        });

        // Add title
        const noteTitle = content.createDiv('note-title');
        noteTitle.setText(event.id);

        // Make note content clickable
        content.addEventListener('click', () => {
            this.app.workspace.openLinkText(event.fileName, '', false);
        });

        return eventEl;
    }

    public async refresh(): Promise<void> {
        await this.loadNostrNotes();
        this.updateTimelineDisplay();
    }
}
