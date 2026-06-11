"use client";

import { useState } from "react";
import { Box, Text, FileUpload, useFileUploadContext } from "@chakra-ui/react";
import {
  getPhotoUploadError,
  LEAD_PHOTO_MAX_BYTES,
  LEAD_PHOTO_MAX_COUNT,
  formatPhotoSizeMb,
} from "@/lib/lead-photos";

type Props = {
  id?: string;
  onFilesChange: (files: File[]) => void;
  compact?: boolean;
};

function PhotoThumbnails() {
  const { acceptedFiles } = useFileUploadContext();
  if (!acceptedFiles.length) return null;

  return (
    <FileUpload.ItemGroup
      display="flex"
      flexWrap="wrap"
      gap={3}
      w="full"
      mt={3}
      flexDirection="row"
    >
      {acceptedFiles.map((file) => (
        <FileUpload.Item
          key={`${file.name}-${file.size}-${file.lastModified}`}
          file={file}
          w="92px"
          flexDirection="column"
          alignItems="stretch"
          p={2}
          borderWidth="1px"
          borderColor="brand.100"
          rounded="button"
          bg="surface"
          gap={2}
        >
          <Box position="relative" alignSelf="center">
            <FileUpload.ItemPreviewImage
              boxSize="72px"
              rounded="button"
              objectFit="cover"
              alt=""
            />
            <FileUpload.ItemDeleteTrigger
              position="absolute"
              top="-10px"
              right="-10px"
              boxSize={11}
              minW={11}
              minH={11}
              rounded="full"
              bg="red.600"
              color="white"
              fontSize="xs"
              lineHeight={1}
              aria-label={`Видалити ${file.name}`}
            />
          </Box>
          <FileUpload.ItemName
            fontSize="10px"
            color="muted"
            lineClamp={2}
            textAlign="center"
            title={file.name}
          />
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
}

function UploadDropzone({ compact }: { compact?: boolean }) {
  const { acceptedFiles } = useFileUploadContext();
  const atLimit = acceptedFiles.length >= LEAD_PHOTO_MAX_COUNT;

  if (atLimit) {
    return (
      <Text fontSize="xs" color="muted" textAlign="center" py={2}>
        Додано максимум {LEAD_PHOTO_MAX_COUNT} фото. Видаліть одне, щоб замінити.
      </Text>
    );
  }

  return (
    <FileUpload.Dropzone
      w="full"
      minH={compact ? "100px" : "140px"}
      py={6}
      px={4}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="brand.200"
      rounded="button"
      bg="elevated"
      cursor="pointer"
      transition="background 0.2s, border-color 0.2s"
      _hover={{ bg: "brand.50", borderColor: "brand.400" }}
      _dragging={{ bg: "brand.50", borderColor: "accent.500" }}
    >
      <FileUpload.DropzoneContent>
        <Text fontSize="sm" fontWeight="semibold" color="ink">
          Завантажити фото
        </Text>
        <Text fontSize="xs" color="muted" mt={1}>
          До {LEAD_PHOTO_MAX_COUNT} зображень, кожне до {formatPhotoSizeMb()}
        </Text>
        <Text fontSize="xs" color="muted" mt={0.5}>
          Натисніть або перетягніть сюди
        </Text>
      </FileUpload.DropzoneContent>
    </FileUpload.Dropzone>
  );
}

export function LeadPhotoUpload({ id, onFilesChange, compact }: Props) {
  const [uploadError, setUploadError] = useState<string | null>(null);

  return (
    <Box w="full">
      <FileUpload.Root
        maxFiles={LEAD_PHOTO_MAX_COUNT}
        maxFileSize={LEAD_PHOTO_MAX_BYTES}
        accept="image/*"
        onFileChange={(details) => {
          setUploadError(null);
          onFilesChange(details.acceptedFiles);
        }}
        onFileReject={(details) => {
          setUploadError(getPhotoUploadError(details.files));
        }}
      >
        <FileUpload.HiddenInput id={id} />
        <UploadDropzone compact={compact} />
        <PhotoThumbnails />
        <Text fontSize="xs" color="muted" mt={2}>
          {LEAD_PHOTO_MAX_COUNT} фото макс. · {formatPhotoSizeMb()} на файл
        </Text>
      </FileUpload.Root>
      {uploadError && (
        <Text mt={2} fontSize="xs" fontWeight="medium" color="red.500" role="alert">
          {uploadError}
        </Text>
      )}
    </Box>
  );
}
