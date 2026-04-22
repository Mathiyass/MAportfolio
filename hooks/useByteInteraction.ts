'use client';
import { useRef, useCallback } from 'react';
import { useSpring } from 'motion/react';
import { useByteStore } from '@/store/byteStore';

export function useByteInteraction() {
  const byteRef = useRef<HTMLDivElement>(null);
  const { actions } = useByteStore();

  const leftIrisX = useSpring(0, { stiffness: 120, damping: 20 });
  const leftIrisY = useSpring(0, { stiffness: 120, damping: 20 });
  const rightIrisX = useSpring(0, { stiffness: 120, damping: 20 });
  const rightIrisY = useSpring(0, { stiffness: 120, damping: 20 });
  const leftArmAngle = useSpring(0, { stiffness: 60, damping: 15 });
  const rightArmAngle = useSpring(0, { stiffness: 60, damping: 15 });
  const headRotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const headRotateY = useSpring(0, { stiffness: 80, damping: 20 });
  const antennaSway = useSpring(0, { stiffness: 100, damping: 25 });

  const updateTracking = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!byteRef.current) return;
      const rect = byteRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxEye = 4;
      const eyeX = Math.max(-maxEye, Math.min(maxEye, dx * 0.02));
      const eyeY = Math.max(-maxEye, Math.min(maxEye, dy * 0.02));

      leftIrisX.set(eyeX);
      leftIrisY.set(eyeY);
      rightIrisX.set(eyeX);
      rightIrisY.set(eyeY);
      leftArmAngle.set(Math.atan2(dy, dx - 30) * (180 / Math.PI) * 0.1);
      rightArmAngle.set(Math.atan2(dy, dx + 30) * (180 / Math.PI) * 0.1);
      headRotateY.set(dx * 0.01);
      headRotateX.set(dy * -0.005);
      antennaSway.set(dx * 0.008);

      if (dist < 100) {
        actions.setMood('excited');
      } else if (dist < 250) {
        actions.setMood('happy');
      }
    },
    [leftIrisX, leftIrisY, rightIrisX, rightIrisY, leftArmAngle, rightArmAngle, headRotateX, headRotateY, antennaSway, actions]
  );

  return {
    byteRef,
    updateTracking,
    leftIrisX, leftIrisY, rightIrisX, rightIrisY,
    leftArmAngle, rightArmAngle,
    headRotateX, headRotateY,
    antennaSway,
  };
}
