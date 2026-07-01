export function normalizePhysicalCount(value) {
  const num = Math.floor(Number(value));
  return Number.isFinite(num) && num > 0 ? num : 0;
}

export function makePlannedBoxes(cargoTypes, physicalCounts) {
  const boxes = [];
  const updatedTypes = cargoTypes.map(type => {
    const totalPhysical = normalizePhysicalCount(physicalCounts[type.id]);
    const perBundle = Math.max(1, Math.min(4, Number(type.stackCount || 4)));
    const bundles = totalPhysical === 0 ? 0 : Math.ceil(totalPhysical / perBundle);

    for (let i = 0; i < bundles; i += 1) {
      const remaining = totalPhysical - i * perBundle;
      const stackCount = Math.min(perBundle, remaining);
      boxes.push({
        id: crypto.randomUUID(),
        typeId: type.id,
        name: type.name,
        length: Number(type.length),
        width: Number(type.width),
        color: type.color,
        stackCount,
        x: 0,
        y: 0,
        placed: false,
        rotated: false,
      });
    }

    return { ...type, qty: bundles };
  });

  return { cargoTypes: updatedTypes, boxes };
}
