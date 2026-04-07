import React from "react";
import heVanDong from "../../assets/img/he-van-dong.png";

export default function MovementFunctionSection() {
  return (
    <section className="bg-white border border-[#E0F0FF] rounded-2xl p-4 md:p-6 shadow-sm space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-[#1F2937]">Chức năng của hệ vận động</h3>

          <p className="text-sm leading-relaxed text-[#475569]">
            Bộ xương tạo nên khung cơ thể, giúp cơ thể có hình dạng nhất định và bảo vệ các cơ quan bên trong.
          </p>

          <p className="text-sm leading-relaxed text-[#475569]">
            Cơ bám vào xương, khi co và giãn sẽ làm xương cử động, giúp cơ thể di chuyển và vận động.
          </p>

          <p className="text-sm leading-relaxed text-[#475569]">
            Nhờ sự phối hợp giữa xương, cơ và khớp mà cơ thể có thể đi, đứng, chạy, nhảy và thực hiện nhiều hoạt động khác.
          </p>

          <div className="rounded-xl bg-[#F0F9FF] border-l-4 border-[#0ea5e9] p-3">
            <p className="text-sm font-semibold text-[#0F172A]">
              Hệ vận động giúp nâng đỡ cơ thể, bảo vệ cơ quan bên trong và tạo ra vận động.
            </p>
          </div>
        </div>

        <figure className="w-full max-w-[520px] mx-auto">
          <img
            src={heVanDong}
            alt="Minh họa hệ vận động"
            className="w-full rounded-xl border border-[#DDEBFF] object-contain block"
          />
          <figcaption className="mt-2 text-xs text-center text-[#64748B]">
            Hệ vận động giúp cơ thể vận động linh hoạt.
          </figcaption>
        </figure>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <article className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-3">
          <p className="text-xs uppercase tracking-wider font-bold text-[#1D4ED8]">Nâng đỡ</p>
          <p className="mt-1 text-sm text-[#1E3A8A]">Giữ cơ thể đứng vững, duy trì tư thế khi học tập và vận động.</p>
        </article>

        <article className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-3">
          <p className="text-xs uppercase tracking-wider font-bold text-[#15803D]">Bảo vệ</p>
          <p className="mt-1 text-sm text-[#166534]">Che chở cơ quan quan trọng như não, tim và phổi.</p>
        </article>

        <article className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3">
          <p className="text-xs uppercase tracking-wider font-bold text-[#B45309]">Vận động</p>
          <p className="mt-1 text-sm text-[#92400E]">Giúp đi, chạy, nhảy, mang vác và thực hiện hoạt động hằng ngày.</p>
        </article>
      </div>
    </section>
  );
}
