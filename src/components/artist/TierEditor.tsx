'use client';

import React, { useState } from 'react';
import { Tier } from '@/types';
import { Button, Badge } from '@/components/ui';

interface TierEditorProps {
  tier?: Tier | null;
  artistId: string;
  onSave: (tierData: Partial<Tier>) => void;
  onCancel: () => void;
}

export function TierEditor({ tier, artistId, onSave, onCancel }: TierEditorProps) {
  const [name, setName] = useState(tier?.name || '');
  const [price, setPrice] = useState(tier?.priceMonthly || 4.99);
  const [tagline, setTagline] = useState(tier?.tagline || '');
  const [description, setDescription] = useState(tier?.description || '');
  const [features, setFeatures] = useState<string[]>(tier?.features || ['']);
  const [highlight, setHighlight] = useState<Tier['highlight']>(tier?.highlight || null);

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      artistId,
      name,
      priceMonthly: price,
      tagline,
      description,
      features: features.filter((f) => f.trim() !== ''),
      highlight,
      contentPreview: tier?.contentPreview || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Tier Name */}
      <div>
        <label className="block text-white font-medium mb-2">Tier Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Inner Circle"
          maxLength={30}
          required
        />
        <p className="text-[#a7a7a7] text-xs mt-1">{name.length}/30 characters</p>
      </div>

      {/* Price */}
      <div>
        <label className="block text-white font-medium mb-2">
          Monthly Price: ${price.toFixed(2)}
        </label>
        <input
          type="range"
          min={0.99}
          max={19.99}
          step={0.50}
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full h-2 bg-[#535353] rounded-lg appearance-none cursor-pointer accent-[#1ed760]"
        />
        <div className="flex justify-between text-[#a7a7a7] text-xs mt-1">
          <span>$0.99</span>
          <span>$19.99</span>
        </div>
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-white font-medium mb-2">Tagline</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="e.g., Get closer to the music"
          maxLength={50}
          required
        />
        <p className="text-[#a7a7a7] text-xs mt-1">{tagline.length}/50 characters</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-white font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what subscribers get..."
          rows={4}
          maxLength={300}
          required
        />
        <p className="text-[#a7a7a7] text-xs mt-1">{description.length}/300 characters</p>
      </div>

      {/* Features */}
      <div>
        <label className="block text-white font-medium mb-2">Features</label>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="e.g., Behind-the-scenes Clips"
                className="flex-1"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="p-2 text-[#e91429] hover:bg-[#e91429]/10 rounded"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddFeature}
          className="mt-2 text-[#1ed760] text-sm font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add feature
        </button>
      </div>

      {/* Highlight Badge */}
      <div>
        <label className="block text-white font-medium mb-2">Highlight Badge (optional)</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setHighlight(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              !highlight ? 'bg-white text-black' : 'bg-[#282828] text-white'
            }`}
          >
            None
          </button>
          <button
            type="button"
            onClick={() => setHighlight('Most Popular')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              highlight === 'Most Popular' ? 'bg-[#1ed760] text-black' : 'bg-[#282828] text-white'
            }`}
          >
            Most Popular
          </button>
          <button
            type="button"
            onClick={() => setHighlight('Best Value')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              highlight === 'Best Value' ? 'bg-[#ffa42b] text-black' : 'bg-[#282828] text-white'
            }`}
          >
            Best Value
          </button>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-white font-medium mb-2">Preview</label>
        <div className="bg-[#282828] rounded-xl p-5 relative">
          {highlight && (
            <div className="absolute -top-2 right-4">
              <Badge variant={highlight === 'Most Popular' ? 'popular' : 'value'}>
                {highlight}
              </Badge>
            </div>
          )}
          <h3 className="text-white font-bold text-lg">{name || 'Tier Name'}</h3>
          <p className="text-[#a7a7a7] text-sm">{tagline || 'Your tagline here'}</p>
          <div className="mt-2">
            <span className="text-white font-bold text-xl">${price.toFixed(2)}</span>
            <span className="text-[#a7a7a7] text-sm">/mo</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          {tier ? 'Save Changes' : 'Create Tier'}
        </Button>
      </div>
    </form>
  );
}
