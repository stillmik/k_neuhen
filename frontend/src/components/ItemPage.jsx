import { useMemo, useState } from "react";
import { PRODUCT_ITEMS, JEWELRY_ITEMS } from "./HeroSectionWithMultiColorBackground";
import { CenteredWithLogo as SiteFooter, Navbar as SiteNavbar } from "./SiteChrome";

const GALLERY_IMAGE_COUNT = 6;

function getAugmentation(itemId, imageIndex) {
  if (imageIndex === 0) {
    return { zoom: 1, rotation: 0 };
  }

  const seed = Math.abs(Math.sin(itemId * 97.31 + imageIndex * 41.79));
  const zoom = 1.05 + seed * 0.15;
  const rotation = 20 + Math.abs(Math.sin(itemId * 11.17 + imageIndex * 7.31)) * 20;
  const direction = imageIndex % 2 === 0 ? 1 : -1;

  // Keep each augmented frame to a single effect: zoom or rotation.
  return imageIndex % 2 === 0
    ? { zoom, rotation: 0 }
    : { zoom: 1, rotation: rotation * direction };
}

export function ItemPage() {
  const [selectedView, setSelectedView] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeInfo, setActiveInfo] = useState("");
  const [inCart, setInCart] = useState(false);
  const itemId = Number(window.location.pathname.match(/\/item\/(\d+)/)?.[1]);
  const item = useMemo(
    () => [...PRODUCT_ITEMS, ...JEWELRY_ITEMS].find((product) => product.id === itemId),
    [itemId]
  );

  if (!item) {
    return <MissingItem />;
  }

  const isJewelry = item.id >= 100;
  const augmentation = getAugmentation(item.id, selectedView);
  const sizes = isJewelry ? ["One size"] : ["XS", "S", "M", "L", "XL", "2XL"];
  const recommendations = [...PRODUCT_ITEMS, ...JEWELRY_ITEMS]
    .filter((product) => product.id !== item.id)
    .slice(isJewelry ? 0 : 4, isJewelry ? 4 : 8);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-900 text-white">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(255,255,255,0.2)_0.5px,transparent_0)] bg-repeat [background-size:8px_8px]"
        aria-hidden="true"
      />
      <SiteNavbar />
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-16">
          <div>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[30px] border border-neutral-700 bg-neutral-950 p-8 shadow-2xl shadow-black/30">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(255,255,255,0.2)_0.5px,transparent_0)] [background-size:8px_8px] [mask-image:radial-gradient(circle_at_center,white,transparent)]" />
              <button type="button" onClick={() => setSelectedView((view) => (view - 1 + GALLERY_IMAGE_COUNT) % GALLERY_IMAGE_COUNT)} className="absolute left-5 z-20 flex size-12 items-center justify-center rounded-full border border-white bg-black/35 text-2xl text-white backdrop-blur transition hover:bg-white hover:text-black" aria-label="Previous image">‹</button>
              <img
                src={item.src}
                alt={`${item.title} gallery image ${selectedView + 1}`}
                className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-500"
                style={{ transform: `scale(${augmentation.zoom}) rotate(${augmentation.rotation}deg)` }}
              />
              <button type="button" onClick={() => setSelectedView((view) => (view + 1) % GALLERY_IMAGE_COUNT)} className="absolute right-5 z-20 flex size-12 items-center justify-center rounded-full border border-white bg-black/35 text-2xl text-white backdrop-blur transition hover:bg-white hover:text-black" aria-label="Next image">›</button>
              <div className="absolute bottom-6 z-20 flex gap-3">
                {Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) => (
                  <button key={index} type="button" onClick={() => setSelectedView(index)} className={`size-3 rounded-full border-2 border-white transition ${selectedView === index ? "bg-white" : "bg-transparent hover:bg-white/50"}`} aria-label={`View image ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[30px] border border-neutral-700 bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 shadow-xl shadow-black/20 md:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]"
              aria-hidden="true"
            />
            <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-400">{item.designation}</p>
            <h1 className="mt-3 bg-gradient-to-b from-neutral-200 to-neutral-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">{item.title}</h1>
            <p className="mt-5 text-lg leading-8 text-neutral-400">{item.description}</p>
            <p className="mt-6 text-3xl font-semibold">{item.excerpt}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setActiveInfo("size")} className="rounded-full border border-neutral-600 px-4 py-3 text-sm font-medium text-neutral-200 transition hover:border-indigo-400 hover:text-white">Size guide</button>
              <button type="button" onClick={() => setActiveInfo("care")} className="rounded-full border border-neutral-600 px-4 py-3 text-sm font-medium text-neutral-200 transition hover:border-indigo-400 hover:text-white">Care instructions</button>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-neutral-300">Select size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`min-w-11 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${selectedSize === size ? "border-white bg-white text-neutral-950" : "border-neutral-600 bg-neutral-800 text-white hover:border-neutral-400"}`}>{size}</button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-neutral-300">Quantity</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex rounded-full border border-neutral-600 bg-neutral-950">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="size-11 rounded-full text-xl transition hover:bg-neutral-800">−</button>
                  <span className="flex w-10 items-center justify-center text-sm font-semibold">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => value + 1)} className="size-11 rounded-full text-xl transition hover:bg-neutral-800">+</button>
                </div>
                <button type="button" onClick={() => setInCart(true)} className="flex-1 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-indigo-100 active:scale-[0.98]">Add to cart →</button>
              </div>
              {inCart ? <p className="mt-3 text-sm text-emerald-400">Added {quantity} item{quantity > 1 ? "s" : ""} to your cart.</p> : null}
            </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold">Recommended <span className="text-indigo-400">for you</span></h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {recommendations.map((product) => (
              <a key={product.id} href={`/item/${product.id}`} className="group rounded-3xl border border-neutral-700 bg-neutral-900 p-3 transition hover:-translate-y-1 hover:border-indigo-400">
                <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-950 p-3"><img src={product.src} alt={product.title} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" /></div>
                <p className="mt-4 font-semibold text-white">{product.title}</p>
                <p className="mt-1 text-sm text-neutral-400">{product.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />

      {activeInfo ? <InfoModal type={activeInfo} close={() => setActiveInfo("")} /> : null}
    </div>
  );
}

function InfoModal({ type, close }) {
  const isSize = type === "size";
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-3xl border border-neutral-700 bg-neutral-900 p-7 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold">{isSize ? "Size guide" : "Care instructions"}</h2><p className="mt-4 leading-7 text-neutral-300">{isSize ? "Choose your usual size for a regular fit. For an oversized silhouette, select one size up." : "Machine wash cold inside out. Use a gentle cycle, avoid bleach, and air dry away from direct heat."}</p></div><button type="button" onClick={close} className="rounded-full border border-neutral-600 px-3 py-1 text-neutral-300 hover:text-white">×</button></div>{isSize ? <div className="mt-6 grid grid-cols-3 gap-2 text-center text-sm"><span className="rounded-lg bg-neutral-800 p-2">XS–S<br /><b>Regular</b></span><span className="rounded-lg bg-neutral-800 p-2">M–L<br /><b>Relaxed</b></span><span className="rounded-lg bg-neutral-800 p-2">XL–2XL<br /><b>Oversized</b></span></div> : null}</div></div>;
}

function MissingItem() {
  return <div className="min-h-screen bg-neutral-900 text-white"><SiteNavbar /><main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center"><p className="text-sm uppercase tracking-[0.24em] text-indigo-400">K-Neuhen</p><h1 className="mt-4 text-4xl font-bold">Item not found</h1><a href="/#clothing" className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-neutral-950">Explore collection</a></main><SiteFooter /></div>;
}
