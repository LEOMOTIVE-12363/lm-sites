export type MediaFit = 'cover' | 'contain';

export interface ImageMediaReference {
  type?: 'image';
  src: string;
  alt: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  fit?: MediaFit;
}

export interface VideoCaptionTrack {
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface VideoMediaReference {
  type: 'video';
  src: string;
  alt: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  fit?: MediaFit;
  poster?: string;
  captions?: VideoCaptionTrack[];
}

export type MediaReference = ImageMediaReference | VideoMediaReference;

export function isVideoMedia(
  media: MediaReference,
): media is VideoMediaReference {
  return media.type === 'video';
}
