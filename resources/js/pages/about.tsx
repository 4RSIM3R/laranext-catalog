import { PublicLayout } from "@/layouts/public-layout";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function About() {
    const [openSection, setOpenSection] = useState<string | null>("customer-service");

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const services = [
        {
            id: "customer-service",
            title: "Customer Service",
            content:
                "Lorem ipsum dolor sit amet, consectetur. Turpis mattis neque, nunc, at egestas donec augue augue. Sed morbi pharetra venenatis nam.",
        },
        {
            id: "online-consultation",
            title: "Online Consultation",
            content:
                "Lorem ipsum dolor sit amet, consectetur. Turpis mattis neque, nunc, at egestas donec augue augue. Sed morbi pharetra venenatis nam.",
        },
        {
            id: "sales-management",
            title: "Sales Management",
            content:
                "Lorem ipsum dolor sit amet, consectetur. Turpis mattis neque, nunc, at egestas donec augue augue. Sed morbi pharetra venenatis nam.",
        },
    ];

    const missionPoints = [
        "Meningkatkan kapasitas UMKM melalui edukasi dan pendampingan.",
        "Membantu UMKM memasarkan produknya melalui kanal digital.",
        "Menjadi mitra strategis perusahaan dalam menciptakan program CSR yang berdampak dan terukur.",
    ];

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <section className="bg-gray-100 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Home</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-gray-900">About Us</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
                        Tentang Kami
                    </h1>
                </div>
            </section>

            {/* Hero Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                            Memberdayakan UMKM,
                            <br />
                            Menggerakkan Ekonomi Lokal Bersama Anda
                        </h2>
                        <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
                            Lokal Berdaya hadir sebagai jembatan antara potensi
                            UMKM dan dukungan nyata perusahaan melalui program
                            CSR yang berdampak.
                        </p>
                    </div>

                    {/* Hero Image with Overlays */}
                    <div className="relative mb-16 overflow-hidden rounded-2xl">
                        <img
                            src="/about_1.jpeg"
                            alt="Tim Lokal Berdaya"
                            className="h-[500px] w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Bottom Left Text Overlay */}
                        <div className="absolute bottom-8 left-8 right-8 space-y-4 md:bottom-12 md:left-12 md:right-1/2">
                            <p className="text-base text-white md:text-lg">
                                <span className="font-semibold">
                                    Di setiap sudut kota dan desa,
                                </span>{" "}
                                ada ribuan UMKM yang berjuang membangun masa
                                depan.{" "}
                                <span className="font-semibold">
                                    Lokal Berdaya
                                </span>{" "}
                                hadir untuk mendukung mereka melalui edukasi,
                                promosi, dan kolaborasi dengan perusahaan yang
                                peduli pada pemberdayaan ekonomi berkelanjutan.
                            </p>
                        </div>

                        {/* Top Right Text Overlay */}
                        <div className="absolute top-8 right-8 max-w-md rounded-lg bg-black/50 p-6 backdrop-blur-sm md:top-12 md:right-12">
                            <p className="text-sm text-white md:text-base">
                                Kami percaya, program CSR yang tepat sasaran
                                dapat mengubah potensi lokal menjadi kekuatan
                                ekonomi yang menggerakkan banyak kehidupan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left: Services */}
                        <div>
                            <h3 className="mb-8 text-3xl font-bold text-gray-900">
                                Lorem ipsum dolor sit amet,
                                <br />
                                consectetur adipiscing elit.
                            </h3>

                            <div className="space-y-4">
                                {services.map((service) => (
                                    <Collapsible
                                        key={service.id}
                                        open={openSection === service.id}
                                        onOpenChange={() =>
                                            toggleSection(service.id)
                                        }
                                    >
                                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                                            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50">
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {service.title}
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-gray-500 transition-transform ${
                                                        openSection ===
                                                        service.id
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                                                    <p className="text-gray-600">
                                                        {service.content}
                                                    </p>
                                                </div>
                                            </CollapsibleContent>
                                        </div>
                                    </Collapsible>
                                ))}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="flex items-center">
                            <div className="overflow-hidden rounded-2xl">
                                <img
                                    src="/about_2.jpeg"
                                    alt="UMKM Workspace"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Vision */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src="/about_3.jpeg"
                                alt="Team Vision"
                                className="h-[500px] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                <h3 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                                    VISI
                                </h3>
                                <p className="text-lg text-white md:text-xl">
                                    Mewujudkan ekosistem UMKM yang berdaya
                                    saing, berkelanjutan, dan inklusif.
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="flex flex-col justify-center">
                            <h3 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
                                MISI
                            </h3>
                            <div className="space-y-6">
                                {missionPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                                            {index + 1}
                                        </div>
                                        <p className="pt-1 text-lg text-gray-700">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                        Mari Bergabung Bersama Kami
                    </h2>
                    <p className="mb-8 text-lg text-white/90">
                        Jadilah bagian dari gerakan pemberdayaan UMKM Indonesia.
                        Bersama kita ciptakan dampak yang berkelanjutan.
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        className="text-primary"
                    >
                        Hubungi Kami
                    </Button>
                </div>
            </section>
        </div>
    );
}

About.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;