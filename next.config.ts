import type { NextConfig } from "next";

// Cache Components (cacheComponents) on teadlikult välja lülitatud: see nõuab,
// et iga küpsiseid lugev komponent (Supabase'i sessioon) oleks <Suspense>-i sees.
// Meie väikeses rakenduses see kasu ei too.
const nextConfig: NextConfig = {};

export default nextConfig;
