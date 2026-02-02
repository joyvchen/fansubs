'use client';

import React, { useState } from 'react';
import { ExclusiveContent, Tier } from '@/types';
import { Button } from '@/components/ui';

interface ContentCreatorProps {
  artistId: string;
  tiers: Tier[];
  onSave: (content: Omit<ExclusiveContent, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const contentTypes: { id: ExclusiveContent['type']; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'clip',
    label: 'Clip',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    description: 'Short video (under 30 sec)',
  },
  {
    id: 'playlist',
    label: 'Playlist',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
      </svg>
    ),
    description: 'Curated playlist',
  },
  {
    id: 'artist-pick',
    label: 'Artist Pick',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    description: 'Pinned message with image',
  },
  {
    id: 'audio-message',
    label: 'Audio Message',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
      </svg>
    ),
    description: 'Voice note to subscribers',
  },
  {
    id: 'merch-code',
    label: 'Merch Code',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
      </svg>
    ),
    description: 'Exclusive discount code',
  },
  {
    id: 'early-release',
    label: 'Early Release',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    description: 'Early access to release',
  },
];

export function ContentCreator({ artistId, tiers, onSave, onCancel }: ContentCreatorProps) {
  const [contentType, setContentType] = useState<ExclusiveContent['type'] | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [merchCode, setMerchCode] = useState('');

  const handleTierToggle = (tierId: string) => {
    setSelectedTiers((prev) =>
      prev.includes(tierId)
        ? prev.filter((id) => id !== tierId)
        : [...prev, tierId]
    );
  };

  const handleSelectAllTiers = () => {
    if (selectedTiers.length === tiers.length) {
      setSelectedTiers([]);
    } else {
      setSelectedTiers(tiers.map((t) => t.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentType || selectedTiers.length === 0) return;

    onSave({
      artistId,
      type: contentType,
      title,
      description,
      tierAccess: selectedTiers,
      content: contentType === 'merch-code' ? merchCode : undefined,
    });
  };

  // Step 1: Select content type
  if (!contentType) {
    return (
      <div className="space-y-4">
        <h2 className="text-white font-bold text-lg mb-4">What would you like to create?</h2>
        <div className="grid grid-cols-2 gap-3">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setContentType(type.id)}
              className="bg-[#282828] rounded-xl p-4 text-left hover:bg-[#3e3e3e] transition-colors"
            >
              <span className="text-[#1ed760]">{type.icon}</span>
              <h3 className="text-white font-semibold mt-2">{type.label}</h3>
              <p className="text-[#a7a7a7] text-xs mt-1">{type.description}</p>
            </button>
          ))}
        </div>
        <Button variant="secondary" onClick={onCancel} fullWidth>
          Cancel
        </Button>
      </div>
    );
  }

  // Step 2: Content details form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => setContentType(null)}
        className="flex items-center gap-2 text-[#a7a7a7] hover:text-white"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Content Type Badge */}
      <div className="bg-[#282828] rounded-lg p-3 inline-flex items-center gap-2">
        <span className="text-[#1ed760]">
          {contentTypes.find((t) => t.id === contentType)?.icon}
        </span>
        <span className="text-white font-medium">
          {contentTypes.find((t) => t.id === contentType)?.label}
        </span>
      </div>

      {/* Title */}
      <div>
        <label className="block text-white font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your content a title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-white font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what this content is about"
          rows={3}
          required
        />
      </div>

      {/* Merch Code Input */}
      {contentType === 'merch-code' && (
        <div>
          <label className="block text-white font-medium mb-2">Discount Code</label>
          <input
            type="text"
            value={merchCode}
            onChange={(e) => setMerchCode(e.target.value.toUpperCase())}
            placeholder="e.g., VIPFAN20"
            required
          />
          <p className="text-[#a7a7a7] text-xs mt-1">
            This is the code fans will use at checkout
          </p>
        </div>
      )}

      {/* Tier Access */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-white font-medium">Who can access this?</label>
          <button
            type="button"
            onClick={handleSelectAllTiers}
            className="text-[#1ed760] text-sm"
          >
            {selectedTiers.length === tiers.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <div className="space-y-2">
          {tiers.map((tier) => (
            <label
              key={tier.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedTiers.includes(tier.id)
                  ? 'bg-[#1ed760]/10 border border-[#1ed760]'
                  : 'bg-[#282828] border border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTiers.includes(tier.id)}
                onChange={() => handleTierToggle(tier.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded flex items-center justify-center ${
                  selectedTiers.includes(tier.id)
                    ? 'bg-[#1ed760]'
                    : 'bg-[#535353]'
                }`}
              >
                {selectedTiers.includes(tier.id) && (
                  <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className="text-white font-medium">{tier.name}</span>
                <span className="text-[#a7a7a7] text-sm ml-2">
                  ${tier.priceMonthly.toFixed(2)}/mo
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={selectedTiers.length === 0}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
