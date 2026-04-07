import React from "react";
import loangXuongImg from "../../assets/img/loang_xuong.jpg";
import veoCotSongImg from "../../assets/img/veo_cot_song.png";

const diseases = [
  {
    id: "loang-xuong",
    title: "Loãng xương",
    image: loangXuongImg,
    imageAlt: "Minh họa loãng xương",
    description:
      "Loãng xương là tình trạng xương trở nên xốp, nhẹ và dễ gãy hơn bình thường.",
    sections: [
      {
        title: "Đặc điểm",
        items: ["Mật độ xương giảm", "Xương có nhiều lỗ rỗng", "Xương yếu, dễ gãy"],
      },
      {
        title: "Nguyên nhân",
        items: ["Thiếu canxi và vitamin D", "Ít vận động", "Chế độ ăn không hợp lý"],
      },
      {
        title: "Hậu quả",
        items: ["Dễ gãy xương", "Ảnh hưởng vận động"],
      },
      {
        title: "Gợi ý cho học sinh",
        items: ["Uống đủ sữa", "Tắm nắng", "Tập thể dục"],
      },
    ],
  },
  {
    id: "veo-cot-song",
    title: "Vẹo cột sống",
    image: veoCotSongImg,
    imageAlt: "Minh họa vẹo cột sống",
    description:
      "Vẹo cột sống là tình trạng cột sống bị cong lệch sang một bên.",
    sections: [
      {
        title: "Đặc điểm",
        items: ["Cột sống cong", "Vai lệch", "Dáng đứng không cân đối"],
      },
      {
        title: "Nguyên nhân",
        items: ["Ngồi học sai tư thế", "Đeo cặp lệch", "Bàn ghế không phù hợp"],
      },
      {
        title: "Hậu quả",
        items: ["Đau lưng", "Ảnh hưởng dáng đi", "Có thể ảnh hưởng hô hấp"],
      },
      {
        title: "Gợi ý cho học sinh",
        items: ["Ngồi đúng tư thế", "Đeo balo hai quai", "Tập thể dục"],
      },
    ],
  },
];

export default function MovementDiseasesSection() {
  return (
    <section className="bg-white border border-[#E0F0FF] rounded-3xl p-5 md:p-6 shadow-sm space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937]">
          Một số bệnh của hệ vận động
        </h2>
        <p className="text-sm text-[#64748B]">
          Tìm hiểu hai bệnh thường gặp để biết cách phòng tránh và giữ hệ vận
          động khỏe mạnh.
        </p>
      </header>

      <div className="space-y-6">
        {diseases.map((disease, index) => (
          <article
            key={disease.id}
            className="rounded-2xl border border-[#DDEBFF] bg-[#F8FBFF] p-4 md:p-5"
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-5 items-start ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold text-[#1F2937]">
                  {disease.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {disease.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {disease.sections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-xl border border-[#E2E8F0] bg-white p-3 space-y-2"
                    >
                      <p className="text-xs uppercase tracking-wider font-bold text-[#0284C7]">
                        {section.title}
                      </p>
                      <ul className="space-y-1 text-sm text-[#475569]">
                        {section.items.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <img
                  src={disease.image}
                  alt={disease.imageAlt}
                  className="w-full max-w-[400px] mx-auto rounded-xl border border-[#DDEBFF] object-contain block bg-white"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
