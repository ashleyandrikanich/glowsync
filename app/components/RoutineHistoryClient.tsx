"use client";

import { useEffect, useMemo, useState } from "react";
import { loadRoutineProducts, type RoutineProduct } from "@/src/lib/routine";
import {
  loadRoutineUsageHistory,
  saveRoutineUsageHistory,
  type RoutineUsageEvent,
} from "@/src/lib/routine-history";

function frequencyLabel(frequency: RoutineProduct["frequency"]): string {
  switch (frequency) {
    case "every_other_day":
      return "Every other day";
    case "weekly":
      return "Weekly";
    case "as_needed":
      return "As needed";
    default:
      return "Daily";
  }
}

function slotLabel(slot: RoutineProduct["slot"]): string {
  if (slot === "am") return "Morning";
  if (slot === "pm") return "Evening";
  return "Morning + Evening";
}

function dateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

export function RoutineHistoryClient() {
  const [products, setProducts] = useState<RoutineProduct[]>([]);
  const [events, setEvents] = useState<RoutineUsageEvent[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setProducts(loadRoutineProducts());
      setEvents(loadRoutineUsageHistory());
    });
  }, []);

  const recentDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = dateDaysAgo(index);
        return {
          date,
          events: events.filter((event) => event.usedDate === date),
        };
      }),
    [events]
  );

  const recentEvents = useMemo(
    () =>
      [...events]
        .sort((a, b) => b.usedDate.localeCompare(a.usedDate))
        .slice(0, 12),
    [events]
  );

  function clearHistory() {
    setEvents([]);
    saveRoutineUsageHistory([]);
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/32 p-5 shadow-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
            Tracked Products
          </p>
          <p className="mt-2 font-serif text-3xl font-medium text-offblack">
            {products.length}
          </p>
          <p className="mt-2 text-sm text-offblack/60">
            Products currently saved in My Routine.
          </p>
        </div>
        <div className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/32 p-5 shadow-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
            Usage Logs
          </p>
          <p className="mt-2 font-serif text-3xl font-medium text-offblack">
            {events.length}
          </p>
          <p className="mt-2 text-sm text-offblack/60">
            Created when you mark a product as used today.
          </p>
        </div>
        <div className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/32 p-5 shadow-sm">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
            This Week
          </p>
          <p className="mt-2 font-serif text-3xl font-medium text-offblack">
            {recentDays.reduce((sum, day) => sum + day.events.length, 0)}
          </p>
          <p className="mt-2 text-sm text-offblack/60">
            Product uses logged across the last seven days.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-sand/70 bg-linen/60 p-5 shadow-sm">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Seven-day pattern
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-7">
          {recentDays.map((day) => (
            <div
              key={day.date}
              className="rounded-xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/25 p-3"
            >
              <p className="text-xs font-semibold text-earth">{day.date}</p>
              <p className="mt-2 font-serif text-2xl text-offblack">
                {day.events.length}
              </p>
              <p className="text-xs text-offblack/55">
                use{day.events.length === 1 ? "" : "s"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-sand/70 bg-linen/60 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-medium text-offblack">
              Recent usage
            </h2>
            {events.length > 0 ? (
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs font-semibold text-earth underline decoration-sand underline-offset-4 hover:decoration-earth"
              >
                Clear history
              </button>
            ) : null}
          </div>
          <ul className="mt-5 space-y-3">
            {recentEvents.length === 0 ? (
              <li className="rounded-xl border border-dashed border-sand/80 bg-linen/60 px-4 py-6 text-sm text-offblack/60">
                No usage history yet. Open My Routine and mark a product as
                used today to start tracking.
              </li>
            ) : (
              recentEvents.map((event) => (
                <li
                  key={event.id}
                  className="rounded-xl border border-sand/70 bg-gradient-to-br from-linen/85 to-blush/25 p-4"
                >
                  <p className="font-medium text-offblack">
                    {event.brand} {event.productName}
                  </p>
                  <p className="mt-1 text-xs text-offblack/55">
                    {event.usedDate} • {slotLabel(event.slot)}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-sand/70 bg-linen/60 p-5 shadow-sm">
          <h2 className="font-serif text-2xl font-medium text-offblack">
            Saved schedule
          </h2>
          <ul className="mt-5 space-y-3">
            {products.length === 0 ? (
              <li className="rounded-xl border border-dashed border-sand/80 bg-linen/60 px-4 py-6 text-sm text-offblack/60">
                Add products to My Routine to see your saved frequency plan.
              </li>
            ) : (
              products.map((product) => (
                <li
                  key={product.id}
                  className="rounded-xl border border-sand/70 bg-gradient-to-br from-linen/85 to-blush/25 p-4"
                >
                  <p className="font-medium text-offblack">
                    {product.brand} {product.name}
                  </p>
                  <p className="mt-1 text-xs text-offblack/55">
                    {slotLabel(product.slot)} • {frequencyLabel(product.frequency)}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
