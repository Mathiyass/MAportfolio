'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useSpring } from 'framer-motion';
import { useByteStore } from '@/store/byteStore';
import { gsap } from 'gsap';

export function useByteInteraction() {
  const byteRef = useRef<HTMLDivElement>(null);
  const { actions, lastInteraction, isSleeping, isCollapsed } = useByteStore();

  const leftIrisX = useSpring(0, { stiffness: 120, damping: 20 });
  const leftIrisY = useSpring(0, { stiffness: 120, damping: 20 });
  const rightIrisX = useSpring(0, { stiffness: 120, damping: 20 });
  const rightIrisY = useSpring(0, { stiffness: 120, damping: 20 });
  const leftArmAngle = useSpring(0, { stiffness: 60, damping: 15 });
  const rightArmAngle = useSpring(0, { stiffness: 60, damping: 15 });
  const headRotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const headRotateY = useSpring(0, { stiffness: 80, damping: 20 });
  const antennaSway = useSpring(0, { stiffness: 100, damping: 25 });

  // Handle Idle Behavior & Boredom
  useEffect(() => {
    if (isSleeping || isCollapsed) return;

    const checkIdle = setInterval(() => {
      const timeSinceLast = Date.now() - lastInteraction;
      if (timeSinceLast > 30000) { // 30 seconds idle
        actions.sleep();
        actions.showSpeech("Zzz... system standby.", 3000);
      } else if (timeSinceLast > 15000) { // 15 seconds bored
        actions.setMood('sleeping'); // Stretching/Bored look
      }
    }, 5000);

    return () => clearInterval(checkIdle);
  }, [lastInteraction, isSleeping, isCollapsed, actions]);

  const updateTracking = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!byteRef.current || isSleeping) return;
      
      actions.updateInteraction();
      
      const rect = byteRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const maxEye = 6;
      const eyeX = Math.max(-maxEye, Math.min(maxEye, dx * 0.03));
      const eyeY = Math.max(-maxEye, Math.min(maxEye, dy * 0.03));

      // Natural movement with momentum
      leftIrisX.set(eyeX);
      leftIrisY.set(eyeY);
      rightIrisX.set(eyeX);
      rightIrisY.set(eyeY);
      
      // IK-like arm tracking
      leftArmAngle.set(Math.atan2(dy, dx - 30) * (180 / Math.PI) * 0.15);
      rightArmAngle.set(Math.atan2(dy, dx + 30) * (180 / Math.PI) * 0.15);
      
      headRotateY.set(dx * 0.015);
      headRotateX.set(dy * -0.008);
      antennaSway.set(dx * 0.012);

      if (dist < 80) {
        actions.setMood('excited');
      } else if (dist < 200) {
        actions.setMood('happy');
      } else {
        actions.setMood('idle');
      }
    },
    [leftIrisX, leftIrisY, rightIrisX, rightIrisY, leftArmAngle, rightArmAngle, headRotateX, headRotateY, antennaSway, actions, isSleeping]
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
