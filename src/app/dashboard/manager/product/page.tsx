"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ManagerGuard from "@/components/dashboard/ManagerGuard";

export default function ProductPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const defaultProducts = [

    {
      name: "Standard Issue Radio",
      category: "Communication",
      quantity: 30,
      assigned: 0,
      lowStockThreshold: 5
    },

    {
      name: "Tactical Vest (L)",
      category: "Armor",
      quantity: 18,
      assigned: 0,
      lowStockThreshold: 6
    },

    {
      name: "NVGs Gen 3",
      category: "Optics",
      quantity: 23,
      assigned: 0,
      lowStockThreshold: 8
    },

    {
      name: "Ballistic Helmet",
      category: "Armor",
      quantity: 25,
      assigned: 0,
      lowStockThreshold: 5
    },

    {
      name: "Satcom Transceiver",
      category: "Communication",
      quantity: 17,
      assigned: 0,
      lowStockThreshold: 10
    },

    {
      name: "Level IV Plates",
      category: "Armor",
      quantity: 15,
      assigned: 0,
      lowStockThreshold: 5
    },

    {
      name: "Tactical Drone v4",
      category: "UAV",
      quantity: 26,
      assigned: 0,
      lowStockThreshold: 7
    },

    {
      name: "Night Vision Gen 3",
      category: "Optics",
      quantity: 20,
      assigned: 0,
      lowStockThreshold: 5
    },

    {
      name: "Field Medical Kit",
      category: "Medical",
      quantity: 40,
      assigned: 0,
      lowStockThreshold: 10
    },

    {
      name: "Combat Boots",
      category: "Gear",
      quantity: 50,
      assigned: 0,
      lowStockThreshold: 15
    },

    {
      name: "Combat Tactical Vehicle Kit",
      category: "Vehicles",
      quantity: 4,
      assigned: 0,
      lowStockThreshold: 5
    }

  ];

  const fetchData = async () => {

    const prodSnap = await getDocs(collection(db, "products"));

    // If no products in Firestore → insert admin products
    if (prodSnap.empty) {

      for (let p of defaultProducts) {
        await addDoc(collection(db, "products"), p);
      }

      const newSnap = await getDocs(collection(db, "products"));
      setProducts(newSnap.docs.map(d => ({ id: d.id, ...d.data() })));

    } else {

      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));

    }

    const catSnap = await getDocs(collection(db, "categories"));
    setCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() })));

  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryName = (product: any) => {

    if (product.categoryId) {
      const cat = categories.find(c => c.id === product.categoryId);
      if (cat) return cat.name;
    }

    if (product.category) {
      return product.category;
    }

    return "Uncategorized";
  };

  return (

    <ManagerGuard>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Equipment Overview
        </h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3 text-left">Equipment</th>
                <th className="text-left">Category</th>
                <th className="text-center">Available</th>
                <th className="text-center">Assigned</th>
                <th className="text-center">Status</th>
              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (

                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No equipment available.
                  </td>
                </tr>

              ) : (

                products.map(p => {

                  const available = p.quantity || 0;
                  const assigned = p.assigned || 0;

                  const threshold = p.lowStockThreshold || 5;

                  let status = "Available";

                  if (available === 0) {
                    status = "Out of Stock";
                  }
                  else if (available <= threshold) {
                    status = "Low Stock";
                  }

                  return (

                    <tr key={p.id} className="border-b hover:bg-gray-50">

                      <td className="p-3 font-medium">
                        {p.name}
                      </td>

                      <td>
                        {getCategoryName(p)}
                      </td>

                      <td className="text-center">
                        {available}
                      </td>

                      <td className="text-center">
                        {assigned}
                      </td>

                      <td className="text-center">

                        <span
                          className={
                            status === "Available"
                              ? "text-green-600 font-semibold"
                              : status === "Low Stock"
                              ? "text-yellow-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {status}
                        </span>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </ManagerGuard>

  );

}