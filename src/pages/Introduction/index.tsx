import SwiperCore from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "./style.css";
SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

const Introduction = () => {
  const slides = [
    {
      id: 1,
      background:
        "https://img.freepik.com/free-photo/6g-internet-connection_23-2150909447.jpg?w=996&t=st=1700202405~exp=1700203005~hmac=ea249311c71ffeb82cd2930e424067f345a0612788a339fc54a784d6386e55a6",
    },
    {
      id: 2,
      background:
        "https://img.freepik.com/free-photo/glowing-skyscrapers-illuminate-futuristic-cityscape-night-generated-by-ai_188544-36456.jpg?t=st=1700191792~exp=1700195392~hmac=f8de69055b20696c17dc1f53f2fa15750a2a5c96a55a22e21c47a7c7494f34e6&w=1060",
    },
    {
      id: 3,
      background:
        "https://img.freepik.com/free-vector/global-networking-technology-background-digital-communication_53876-119502.jpg?w=996&t=st=1700202633~exp=1700203233~hmac=219a895ede27efce824d0aee7ab2dfde856745bf4deafa2ee228da44b7ec2258",
    },
    {
      id: 4,
      background:
        "https://img.freepik.com/free-photo/futuristic-blue-cloud-with-pixel-digital-transformation_587448-4935.jpg?t=st=1700202647~exp=1700206247~hmac=af2140a193c45658742bc070b2288fd6cd2e82fdaada8d50567783099848e4a0&w=1060",
    },
    {
      id: 5,
      background:
        "https://img.freepik.com/free-vector/glowing-blue-cuircuit-lines-diagram_1017-33018.jpg?w=1380&t=st=1700202688~exp=1700203288~hmac=a9506c7256b3d0a9bb4a949389fd8305e3849a87cc13ce21f6b88ec5aa96a6c2s",
    },
  ];

  const duplicatedSlides = [...slides];

  return (
    <div className="App container mt-7">
      <Swiper
        effect="coverflow"
        coverflowEffect={{
          rotate: 60,
          stretch: 28,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        parallax={true}
        slidesPerView={2}
        centeredSlides
        style={{ height: "620px", padding: "10px" }}
      >
        {duplicatedSlides.map((slice) => (
          <SwiperSlide
            key={slice.id}
            style={{
              backgroundSize: "cover", // Thêm kiểu cover
              backgroundPosition: "center", // Đảm bảo hình ảnh nằm giữa
              backgroundImage: `url(${slice.background})`,
            }}
          >
            <div className="text-white">Slide {slice.id}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Introduction;
