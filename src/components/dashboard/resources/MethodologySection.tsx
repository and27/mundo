"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FiPlay,
  FiDownload,
  FiBookOpen,
  FiHeart,
  FiCompass,
  FiStar,
  FiEye,
  FiZoomIn,
  FiX,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const MethodologySection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<InfographicType | null>(
    null
  );
  const youtubeVideoId = "1sE4Ogey7OM";

  const principles = [
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: "Bienestar Emocional",
      description:
        "Desarrollo integral desde la autoestima y el equilibrio interior",
    },
    {
      icon: <FiCompass className="w-5 h-5" />,
      title: "Exploración Guiada",
      description:
        "Acompañamiento respetuoso en el viaje de autodescubrimiento",
    },
    {
      icon: <HiSparkles className="w-5 h-5" />,
      title: "Cultura Andina",
      description: "Sabiduría ancestral aplicada al crecimiento personal",
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: "Experiencias Significativas",
      description: "Vivencias que transforman y fortalecen el mundo interior",
    },
  ];

  type InfographicType = {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  const infographics = [
    {
      src: "/images/infographics/principios_mim.png",
      alt: "Infografía de los Principios de la Metodología Mundo Interior",
      title: "Principios MIM",
      description: "Los fundamentos que guían cada experiencia",
    },
    {
      src: "/images/infographics/viaje_del_explorador.png",
      alt: "Infografía del Viaje del Explorador en Mundo Interior",
      title: "Viaje del Explorador",
      description: "El camino de transformación personal",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-jaguar/10 to-jaguar/20 px-4 py-2 rounded-full mb-4">
          <HiSparkles className="w-4 h-4 text-jaguar" />
          <span className="text-sm font-medium text-jaguar">
            Metodología MIM
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-condor mb-3">
          El Corazón de{" "}
          <span className="bg-gradient-to-r from-jaguar to-jaguar/80 bg-clip-text text-transparent">
            Mundo Interior
          </span>
        </h2>
        <p className="text-lg text-condor/70 max-w-2xl mx-auto">
          Descubre nuestra metodología integral que combina sabiduría ancestral
          andina con técnicas modernas de desarrollo emocional
        </p>
      </div>

      {/* Video Section */}
      {youtubeVideoId && (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-condor/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center">
              <FiPlay className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-condor">
                Video Introductorio
              </h3>
              <p className="text-sm text-condor/60">
                Conoce los fundamentos de nuestra metodología
              </p>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-condor/5 to-jaguar/5">
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-condor/10 to-jaguar/10">
                <button
                  onClick={() => setVideoLoaded(true)}
                  className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full shadow-lg border border-condor/20"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiPlay className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <span className="font-medium text-condor">
                    Reproducir Video
                  </span>
                </button>
              </div>
            )}

            {videoLoaded && (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                title="Video Introductorio a la Metodología MIM"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      )}

      {/* Principles Overview */}
      <div className="bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-condor/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center">
            <FiCompass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-condor">
              Principios Fundamentales
            </h3>
            <p className="text-sm text-condor/60">
              Los pilares que sostienen cada experiencia MIM
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:scale-105 transition-all duration-300 p-4 rounded-xl border border-condor/10 hover:border-jaguar/30 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-jaguar/20 to-jaguar/10 group-hover:from-jaguar/30 group-hover:to-jaguar/20 rounded-xl flex items-center justify-center mb-3 transition-all duration-300">
                <div className="text-jaguar group-hover:scale-110 transition-transform">
                  {principle.icon}
                </div>
              </div>
              <h4 className="font-semibold text-condor mb-2 group-hover:text-jaguar transition-colors">
                {principle.title}
              </h4>
              <p className="text-sm text-condor/70 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Download Guide Section */}
      <div className="bg-gradient-to-r from-jaguar/5 via-jaguar/10 to-jaguar/5 rounded-2xl p-6 border border-jaguar/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiBookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-condor mb-2">
                Guía Completa de la Metodología MIM
              </h3>
              <p className="text-condor/80 mb-3 max-w-2xl">
                Profundiza en los principios que guían cada experiencia en Mundo
                Interior, el rol del acompañante y cómo fomentamos el bienestar
                emocional y la autoestima desde la riqueza de la cultura andina.
              </p>
            </div>
          </div>

          <a
            href="/downloads/guia_mim.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-jaguar to-jaguar/90 hover:from-jaguar/90 hover:to-jaguar text-white hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl font-medium flex-shrink-0"
          >
            <FiDownload className="w-4 h-4 group-hover:animate-bounce" />
            Descargar Guía
          </a>
        </div>
      </div>

      {/* Infographics Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-condor/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-jaguar to-jaguar/80 rounded-xl flex items-center justify-center">
            <FiEye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-condor">
              Principios Clave en una Mirada
            </h3>
            <p className="text-sm text-condor/60">
              Infografías que resumen nuestra metodología
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {infographics.map((infographic, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-xl overflow-hidden border border-condor/10 hover:border-jaguar/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-condor/5 to-jaguar/5">
                <Image
                  src={infographic.src}
                  alt={infographic.alt}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedImage(infographic)}
                    className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 p-3 rounded-full shadow-lg border border-condor/20"
                  >
                    <FiZoomIn className="w-5 h-5 text-condor" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-condor mb-1 group-hover:text-jaguar transition-colors">
                  {infographic.title}
                </h4>
                <p className="text-sm text-condor/70">
                  {infographic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 p-2 rounded-full shadow-lg border border-condor/20"
            >
              <FiX className="w-5 h-5 text-condor" />
            </button>
            <div className="p-6">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={800}
                className="object-contain w-full h-full max-h-[70vh]"
              />
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-condor mb-1">
                  {selectedImage.title}
                </h4>
                <p className="text-sm text-condor/70">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodologySection;
