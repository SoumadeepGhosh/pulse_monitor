"use client";

import { useMemo, useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

import { SuccessCriteriaType } from "@/types/success-criteria.type";

interface Props {
  successCriteriaList: SuccessCriteriaType[];
  value: number[];
  onChange: (value: number[]) => void;
}

export function SuccessCriteriaCombobox({
  successCriteriaList,
  value,
  onChange,
}: Props) {
  const anchor = useComboboxAnchor();

  /**
   * Search query state
   */
  const [query, setQuery] = useState("");

  /**
   * Map for ID → item lookup
   */
  const itemMap = useMemo(() => {
    return new Map(successCriteriaList.map((item) => [item.id, item]));
  }, [successCriteriaList]);

  /**
   * Convert selected IDs → items
   */
  const selectedItems = useMemo(() => {
    return value
      .map((id) => itemMap.get(id))
      .filter(Boolean) as SuccessCriteriaType[];
  }, [value, itemMap]);

  /**
   * Filter items by NAME only
   */
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return successCriteriaList;

    return successCriteriaList.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
  }, [successCriteriaList, query]);

  return (
    <Combobox
      multiple
      items={filteredItems}
      value={selectedItems}
      onValueChange={(items: SuccessCriteriaType[]) => {
        onChange(items.map((i) => i.id));
      }}
      isItemEqualToValue={(a, b) => a.id === b.id}
      autoHighlight
    >
      {/* Chips + input */}
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: SuccessCriteriaType[]) => (
            <>
              {values.map((item) => (
                <ComboboxChip key={item.id}>
                  {item.name}
                </ComboboxChip>
              ))}

              <ComboboxChipsInput
                placeholder="Search criteria..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>

      {/* Dropdown */}
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No criteria found.</ComboboxEmpty>

        <ComboboxList>
          {(item: SuccessCriteriaType) => (
            <ComboboxItem key={item.id} value={item}>
              <div className="flex w-full items-center justify-between">
                <span>{item.name}</span>
                <span className="text-xs text-muted-foreground">
                  {item.type}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}