// import React, { useState } from "react";
// import {
//   Play,
//   Download,
//   BookOpen,
//   Heart,
//   Compass,
//   Star,
//   Eye,
//   ZoomIn,
//   X,
//   Sparkles,
// } from "lucide-react";
// import Image from "next/image";

// const MethodologySection = () => {
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const youtubeVideoId = "1sE4Ogey7OM";

//   const principles = [
//     {
//       icon: <Heart className="w-5 h-5" />,
//       title: "Bienestar Emocional",
//       description:
//         "Desarrollo integral desde la autoestima y el equilibrio interior",
//       color: "from-rose-500 to-pink-600",
//     },
//     {
//       icon: <Compass className="w-5 h-5" />,
//       title: "Exploración Guiada",
//       description:
//         "Acompañamiento respetuoso en el viaje de autodescubrimiento",
//       color: "from-blue-500 to-indigo-600",
//     },
//     {
//       icon: <Sparkles className="w-5 h-5" />,
//       title: "Cultura Andina",
//       description: "Sabiduría ancestral aplicada al crecimiento personal",
//       color: "from-amber-500 to-orange-600",
//     },
//     {
//       icon: <Star className="w-5 h-5" />,
//       title: "Experiencias Significativas",
//       description: "Vivencias que transforman y fortalecen el mundo interior",
//       color: "from-purple-500 to-violet-600",
//     },
//   ];

//   const infographics = [
//     {
//       id: 1,
//       title: "Principios MIM",
//       description: "Los fundamentos que guían cada experiencia",
//       imageUrl:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
//       content:
//         "Infografía detallada de los principios fundamentales de la Metodología Mundo Interior",
//     },
//     {
//       id: 2,
//       title: "Viaje del Explorador",
//       description: "El camino de transformación personal",
//       imageUrl:
//         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
//       content:
//         "Representación visual del proceso de crecimiento personal en MIM",
//     },
//     {
//       id: 3,
//       title: "Cultura Andina",
//       description: "Sabiduría ancestral en práctica",
//       imageUrl:
//         "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
//       content: "Elementos culturales andinos integrados en la metodología",
//     },
//   ];

//   const handleDownload = () => {
//     // Simular descarga de PDF
//     const link = document.createElement("a");
//     link.href =
//       "data:text/plain;charset=utf-8,Guía Metodología MIM - Contenido de ejemplo";
//     link.download = "guia_metodologia_mim.txt";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
//           <Sparkles className="w-4 h-4 text-indigo-600" />
//           <span className="text-sm font-medium text-indigo-700">
//             Metodología MIM
//           </span>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
//           El Corazón de{" "}
//           <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Mundo Interior
//           </span>
//         </h2>
//         <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//           Descubre nuestra metodología integral que combina sabiduría ancestral
//           andina con técnicas modernas de desarrollo emocional
//         </p>
//       </div>

//       {/* Video Section */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//             <Play className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-slate-800">
//               Video Introductorio
//             </h3>
//             <p className="text-sm text-slate-600">
//               Conoce los fundamentos de nuestra metodología
//             </p>
//           </div>
//         </div>

//         <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-indigo-50">
//           {!videoLoaded && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
//               <button
//                 onClick={() => setVideoLoaded(true)}
//                 className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full shadow-lg border border-slate-200"
//               >
//                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                   <Play className="w-4 h-4 text-white ml-0.5" />
//                 </div>
//                 <span className="font-medium text-slate-800">
//                   Reproducir Video
//                 </span>
//               </button>
//             </div>
//           )}

//           {videoLoaded && (
//             <iframe
//               src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
//               title="Video Introductorio a la Metodología MIM"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               className="absolute inset-0 w-full h-full"
//             />
//           )}
//         </div>
//       </div>

//       {/* Principles Overview */}
//       <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//             <Compass className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-slate-800">
//               Principios Fundamentales
//             </h3>
//             <p className="text-sm text-slate-600">
//               Los pilares que sostienen cada experiencia MIM
//             </p>
//           </div>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {principles.map((principle, index) => (
//             <div
//               key={index}
//               className="group bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 p-4 rounded-xl border border-white/50 hover:border-indigo-200 hover:shadow-md"
//             >
//               <div
//                 className={`w-12 h-12 bg-gradient-to-br ${principle.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}
//               >
//                 <div className="text-white">{principle.icon}</div>
//               </div>
//               <h4 className="font-semibold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
//                 {principle.title}
//               </h4>
//               <p className="text-sm text-slate-600 leading-relaxed">
//                 {principle.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Download Guide Section */}
//       <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-200">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex items-start gap-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                 Guía Completa de la Metodología MIM
//               </h3>
//               <p className="text-slate-700 mb-3 max-w-2xl">
//                 Profundiza en los principios que guían cada experiencia en Mundo
//                 Interior, el rol del acompañante y cómo fomentamos el bienestar
//                 emocional y la autoestima desde la riqueza de la cultura andina.
//               </p>
//               <div className="flex items-center gap-4 text-sm text-slate-600">
//                 <span className="flex items-center gap-1">
//                   <BookOpen className="w-4 h-4" />
//                   24 páginas
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Download className="w-4 h-4" />
//                   PDF descargable
//                 </span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleDownload}
//             className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl font-medium flex-shrink-0"
//           >
//             <Download className="w-4 h-4 group-hover:animate-bounce" />
//             Descargar Guía
//           </button>
//         </div>
//       </div>

//       {/* Infographics Section */}
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//             <Eye className="w-5 h-5 text-white" />
//           </div>
//           <div>
//             <h3 className="text-xl font-semibold text-slate-800">
//               Principios Clave en una Mirada
//             </h3>
//             <p className="text-sm text-slate-600">
//               Infografías que resumen nuestra metodología
//             </p>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {infographics.map((infographic) => (
//             <div
//               key={infographic.id}
//               className="group bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
//             >
//               <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-indigo-50">
//                 <img
//                   src={infographic.imageUrl}
//                   alt={infographic.title}
//                   className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//                   <button
//                     onClick={() => setSelectedImage(infographic)}
//                     className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 p-3 rounded-full shadow-lg border border-white/50"
//                   >
//                     <ZoomIn className="w-5 h-5 text-slate-700" />
//                   </button>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
//                   {infographic.title}
//                 </h4>
//                 <p className="text-sm text-slate-600">
//                   {infographic.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-300 p-2 rounded-full shadow-lg border border-white/50"
//             >
//               <X className="w-5 h-5 text-slate-700" />
//             </button>
//             <div className="p-6">
//               <Image
//                 src={selectedImage.imageUrl}
//                 alt={selectedImage.title}
//                 className="object-contain w-full h-full max-h-[70vh] rounded-lg"
//               />
//               <div className="mt-4 text-center">
//                 <h4 className="font-semibold text-slate-800 mb-2">
//                   {selectedImage.title}
//                 </h4>
//                 <p className="text-sm text-slate-600 mb-3">
//                   {selectedImage.description}
//                 </p>
//                 <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
//                   {selectedImage.content}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MethodologySection;
