function toFixedIfNeeded(number: number, decimals: number) {
  return Number.isInteger(number) ? number : number.toFixed(decimals);
}

export const BYTE_CONVERSION: Record<string, number> = {
  TB: 1000 * 1000 * 1000 * 1000,
  GB: 1000 * 1000 * 1000,
  MB: 1000 * 1000,
  kB: 1000,
};

export function getReadableFileSize(fileSize: number) {
  const appropriateSize = Object.keys(BYTE_CONVERSION).find((key) => {
    return fileSize >= BYTE_CONVERSION[key];
  });
  if (appropriateSize) {
    return `${toFixedIfNeeded(
      fileSize / BYTE_CONVERSION[appropriateSize],
      1
    )} ${appropriateSize}`;
  } else {
    return `${fileSize} bytes`;
  }
}

export const FILE_TYPES = {
  WORD_DOCUMENT: "WORD_DOCUMENT",
  IMAGE: "IMAGE",
  PDF: "PDF",
  POWERPOINT: "POWERPOINT",
  TEXT_DOCUMENT: "TEXT_DOCUMENT",
  EXCEL_DOCUMENT: "EXCEL_DOCUMENT",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  UNKNOWN: "UNKNOWN",
};

export const fileTypeFromExtension = (fileName: string) => {
  const [extension] = fileName.split(".").slice(-1);

  if (!extension) {
    return "file-o";
  }

  switch (extension.toLowerCase()) {
    case "doc":
    case "docx": {
      return FILE_TYPES.WORD_DOCUMENT;
    }
    case "jpeg":
    case "png":
    case "bmp":
    case "tiff":
    case "gif":
    case "webp":
    case "jpg": {
      return FILE_TYPES.IMAGE;
    }
    case "pdf": {
      return FILE_TYPES.PDF;
    }
    case "ppt":
    case "pptx": {
      return FILE_TYPES.POWERPOINT;
    }
    case "rtf":
    case "md":
    case "log":
    case "txt": {
      return FILE_TYPES.TEXT_DOCUMENT;
    }
    case "csv":
    case "tsv":
    case "xls":
    case "xlsx": {
      return FILE_TYPES.EXCEL_DOCUMENT;
    }
    case "mp3":
    case "wav":
    case "aac": {
      return FILE_TYPES.AUDIO;
    }
    case "mov":
    case "mp4":
    case "mkv":
    case "wma":
    case "wmv":
    case "avi": {
      return FILE_TYPES.VIDEO;
    }
    default:
      return FILE_TYPES.UNKNOWN;
  }
};

export const getFileIconName = (fileType: string) => {
  switch (fileType) {
    case FILE_TYPES.WORD_DOCUMENT: {
      return "file-word-o";
    }
    case FILE_TYPES.IMAGE: {
      return "file-image-o";
    }
    case FILE_TYPES.PDF: {
      return "file-pdf-o";
    }
    case FILE_TYPES.POWERPOINT: {
      return "file-powerpoint-o";
    }
    case FILE_TYPES.TEXT_DOCUMENT: {
      return "file-text-o";
    }
    case FILE_TYPES.EXCEL_DOCUMENT: {
      return "file-excel-o";
    }
    case FILE_TYPES.AUDIO: {
      return "file-audio-o";
    }
    case FILE_TYPES.VIDEO: {
      return "file-video-o";
    }
    default:
      return "file-o";
  }
};
