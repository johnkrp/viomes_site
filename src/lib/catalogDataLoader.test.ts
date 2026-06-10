import { beforeEach, describe, expect, it, vi } from "vitest";

type MockJsonResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

const makeResponse = (
  ok: boolean,
  body: unknown,
  status = 200,
): MockJsonResponse => ({
  ok,
  status,
  json: async () => body,
});

describe("catalogDataLoader", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("splits products according to family grouping rules", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      makeResponse(true, {
        products: [
          {
            id: "1270",
            title: "GUSTO",
            subcategory: "Legacy",
            representative_image: "/fallback.jpg",
            sizes_count: 2,
            variants_count: 2,
            sizes: [
              {
                size_label: "A",
                size_code: "1020",
                colors_count: 1,
                variants: [
                  {
                    code: "A-001",
                    description: "A",
                    color: "ΜΠΕΖ",
                    image_url: "/a.jpg",
                  },
                ],
              },
              {
                size_label: "B",
                size_code: "1030",
                colors_count: 1,
                variants: [
                  {
                    code: "B-001",
                    description: "B",
                    color: "Γκρι",
                    image_url: "/b.jpg",
                  },
                ],
              },
            ],
          },
        ],
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    const { loadCatalogProducts } = await import("@/lib/catalogDataLoader");
    const products = await loadCatalogProducts();

    expect(products).toHaveLength(2);
    expect(products.map((p) => p.id)).toEqual(["1020", "1030"]);
    expect(products[0].title).toBe("Ποτήρι GUSTO");
    expect(products[1].title).toBe("Πιάτο GUSTO");
  });

  it("uses fallback URL when primary data path fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(makeResponse(false, {}, 500))
      .mockResolvedValueOnce(
        makeResponse(true, {
          products: [],
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    const { loadCatalogProducts } = await import("@/lib/catalogDataLoader");
    const products = await loadCatalogProducts();

    expect(products).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toContain("data/products-grouped.json");
    expect(fetchMock.mock.calls[1][0]).toBe("/data/products-grouped.json");
  });

  it("returns empty products when all fetch paths fail", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(makeResponse(false, {}, 500))
      .mockResolvedValueOnce(makeResponse(false, {}, 500));

    vi.stubGlobal("fetch", fetchMock);

    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { loadCatalogProducts } = await import("@/lib/catalogDataLoader");
    const products = await loadCatalogProducts();

    expect(products).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();
  });
});
