"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          size="sm"
          className="rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </Modal>
  );
};
