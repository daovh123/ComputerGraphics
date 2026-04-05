import React, { useState } from "react";
import { ShieldPlus } from "lucide-react";

type BloodIdentity = {
  id: string;
  antigen: string;
  antibody: string;
  canDonateTo: string;
  canReceiveFrom: string;
  note: string;
  accent: string;
};

const bloodIdentities: BloodIdentity[] = [
  {
    id: "O",
    antigen: "Không có kháng nguyên A hay B trên hồng cầu",
    antibody: "Có cả kháng thể alpha và beta trong huyết tương",
    canDonateTo: "O, A, B, AB",
    canReceiveFrom: "O",
    note: "Nhóm O thường được xem là nhóm cho phổ biến trong hệ ABO.",
    accent: "#EF4444",
  },
  {
    id: "A",
    antigen: "Có kháng nguyên A",
    antibody: "Có kháng thể beta",
    canDonateTo: "A, AB",
    canReceiveFrom: "A, O",
    note: "Người nhóm A không nhận hồng cầu có kháng nguyên B.",
    accent: "#10B981",
  },
  {
    id: "B",
    antigen: "Có kháng nguyên B",
    antibody: "Có kháng thể alpha",
    canDonateTo: "B, AB",
    canReceiveFrom: "B, O",
    note: "Người nhóm B không nhận hồng cầu có kháng nguyên A.",
    accent: "#3B82F6",
  },
  {
    id: "AB",
    antigen: "Có cả kháng nguyên A và B",
    antibody: "Không có kháng thể alpha hay beta",
    canDonateTo: "AB",
    canReceiveFrom: "O, A, B, AB",
    note: "Nhóm AB nhận được từ mọi nhóm trong hệ ABO.",
    accent: "#8B5CF6",
  },
];

export default function ImmuneMarkers() {
  const [activeGroupId, setActiveGroupId] = useState("O");
  const activeGroup =
    bloodIdentities.find((group) => group.id === activeGroupId) ?? bloodIdentities[0];

  return (
    <section className="grid min-h-[calc(100vh-12rem)] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#94A3B8]">
          Kháng nguyên và kháng thể
        </p>
        <h2 className="text-4xl font-black tracking-tight text-[#020617] md:text-6xl">
          Vì sao truyền máu
          <br />
          phải đúng nhóm?
        </h2>
        <p className="max-w-xl text-lg leading-8 text-[#475569]">
          Mỗi nhóm máu mang một dấu hiệu nhận diện khác nhau trên hồng cầu. Nếu truyền
          sai nhóm, kháng thể trong huyết tương người nhận có thể làm hồng cầu bị ngưng
          kết, gây tai biến truyền máu.
        </p>
        <div className="grid gap-3">
          {bloodIdentities.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className="flex items-center justify-between rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4 text-left shadow-sm transition hover:border-[#38BDF8] hover:bg-[#F8FCFF]"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
                  Nhóm máu
                </p>
                <p className="mt-1 text-2xl font-black text-[#0F172A]">{group.id}</p>
              </div>
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white"
                style={{ backgroundColor: group.accent }}
              >
                {group.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[36px] border border-[#E0F0FF] bg-white p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
            style={{ backgroundColor: activeGroup.accent }}
          >
            <ShieldPlus className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
              Hồ sơ miễn dịch
            </p>
            <h3 className="mt-1 text-3xl font-black text-[#0F172A]">Nhóm {activeGroup.id}</h3>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-[24px] bg-[#F8FBFF] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Kháng nguyên
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#0F172A]">
              {activeGroup.antigen}
            </p>
          </article>
          <article className="rounded-[24px] bg-[#FFF7ED] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9A3412]">
              Kháng thể
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#7C2D12]">
              {activeGroup.antibody}
            </p>
          </article>
          <article className="rounded-[24px] bg-[#F0FDF4] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#166534]">
              Có thể cho
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#14532D]">
              {activeGroup.canDonateTo}
            </p>
          </article>
          <article className="rounded-[24px] bg-[#F5F3FF] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6D28D9]">
              Có thể nhận
            </p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#4C1D95]">
              {activeGroup.canReceiveFrom}
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#E2E8F0] bg-white px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
            Ghi nhớ
          </p>
          <p className="mt-2 text-base leading-7 text-[#334155]">{activeGroup.note}</p>
        </div>
      </div>
    </section>
  );
}
