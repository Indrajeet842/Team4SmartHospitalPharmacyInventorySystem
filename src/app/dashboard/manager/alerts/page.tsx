"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ManagerGuard from "@/components/dashboard/ManagerGuard";
import { ChevronDown } from "lucide-react";

type Product = {
  id: string;
  name: string;
  quantity?: number;
  qty?: number;
  lowStockThreshold?: number;
  lowStock?: number;
};

type Supplier = {
  id: string;
  name: string;
  email: string;
};

export default function AlertsPage() {

  const [lowStock, setLowStock] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /* ----------------------------- */
  /* FETCH LOW STOCK PRODUCTS     */
  /* ----------------------------- */

  const fetchAlerts = async () => {

    const snap = await getDocs(collection(db, "products"));

    const products: Product[] = snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<Product, "id">)
    }));

    const filtered = products.filter(p => {

      const quantity = p.quantity ?? p.qty ?? 0;
      const threshold = p.lowStockThreshold ?? p.lowStock ?? 5;

      return quantity <= threshold;

    });

    setLowStock(filtered);

  };

  /* ----------------------------- */
  /* FETCH SUPPLIERS              */
  /* ----------------------------- */

  const fetchSuppliers = async () => {

    const snap = await getDocs(collection(db, "suppliers"));

    const data: Supplier[] = snap.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email
    }));

    setSuppliers(data);

  };

  useEffect(() => {

    fetchAlerts();
    fetchSuppliers();

  }, []);

  /* ----------------------------- */
  /* REQUEST RESTOCK FUNCTION     */
  /* ----------------------------- */

  const requestRestock = async (
    product: Product,
    supplier: Supplier
  ) => {

    const qty = Number(prompt(`Enter restock quantity request for ${supplier.name}`));

    if (!qty || qty <= 0) return;

    const quantity = product.quantity ?? product.qty ?? 0;
    const threshold = product.lowStockThreshold ?? product.lowStock ?? 5;

    await addDoc(collection(db, "restockRequests"), {
      productId: product.id,
      productName: product.name,
      currentStock: quantity,
      threshold: threshold,
      requestedQuantity: qty,
      supplierName: supplier.name,
      supplierEmail: supplier.email,
      requestedBy: "Manager",
      status: "pending",
      createdAt: new Date()
    });

    alert(`Restock request sent to ${supplier.name}`);

    setOpenDropdown(null);

  };

  return (

    <ManagerGuard>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold text-red-600">
          Low Stock Alerts
        </h1>

        {lowStock.length === 0 && (

          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg">
            All equipment levels are healthy. No low stock items detected.
          </div>

        )}

        <div className="grid grid-cols-3 gap-4">

          {lowStock.map(p => {

            const quantity = p.quantity ?? p.qty ?? 0;
            const threshold = p.lowStockThreshold ?? p.lowStock ?? 5;

            return (

              <div
                key={p.id}
                className="bg-white border-l-4 border-red-500 shadow p-4 rounded-lg"
              >

                <h2 className="text-lg font-semibold">
                  {p.name}
                </h2>

                <p className="text-gray-600">
                  Available: <span className="font-bold text-red-600">
                    {quantity}
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  Threshold: {threshold}
                </p>

                <span className="inline-block mt-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Low Stock Warning
                </span>

                {/* ACTION BUTTONS */}

                <div className="mt-3 flex items-center gap-2 relative">

                  {/* MAIN BUTTON */}

                  <button
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    onClick={() => setOpenDropdown(
                      openDropdown === p.id ? null : p.id
                    )}
                  >
                    Request Restock
                  </button>

                  {/* DROPDOWN ARROW */}

                  <button
                    onClick={() => setOpenDropdown(
                      openDropdown === p.id ? null : p.id
                    )}
                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                  >
                    <ChevronDown size={18} />
                  </button>

                  {/* SUPPLIER DROPDOWN */}

                  {openDropdown === p.id && (

                    <div className="absolute top-10 left-0 bg-white shadow-lg border rounded w-64 z-10">

                      {suppliers.map(s => (

                        <div
                          key={s.id}
                          onClick={() => requestRestock(p, s)}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                        >

                          <p className="font-semibold text-sm">
                            {s.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {s.email}
                          </p>

                        </div>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </ManagerGuard>

  );

}