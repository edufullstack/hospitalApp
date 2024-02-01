"use client";

import {
  getHospitales,
  getInsumos,
  removeHospital,
} from "@/services/organizacionDash.services";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import HospitalForm from "@/components/HospitalForm";
import HospitalCard from "@/components/HospitalCard";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const OrganizationDashboard = ({ hospitalName }: any) => {
  const [actualizar, setActualizar] = useState(0);
  const [insumos, setInsumos] = useState([]);
  const [hospitales, setHospitales] = useState([]);
  const [showHospitales, setShowHospitales] = useState(false);
  const [showCrearHospital, setShowCrearHospital] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchInsumos = async () => {
      const data = await getInsumos();
      setInsumos(data);
    };
    const fetchHospital = async () => {
      const hospitalData = await getHospitales();
      setHospitales(hospitalData);
    };
    fetchInsumos();
    fetchHospital();
  }, [actualizar]);

  const handleBorrarHospital = async (hospitalId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const eliminado = await removeHospital(hospitalId);
          if (eliminado.error) {
            Swal.fire(
              "Error",
              "Error al eliminar el insumo, inténtalo de nuevo",
              "error"
            );
          } else {
            Swal.fire("Eliminado", "El insumo ha sido eliminado.", "success");
            setActualizar(actualizar + 1);
          }
        } catch (error) {
          console.error("Error al eliminar el insumo:", error);
          Swal.fire("Error", "Error al eliminar, inténtalo de nuevo", "error");
        }
      }
    });
  };

  const handleHospital = () => {
    setShowHospitales(!showHospitales);
  };
  const handleShowCrearHospital = () => {
    setShowCrearHospital(!showCrearHospital);
  };

  return (
    <div>
      <h1>Dashboard de la Organización</h1>
      <div className="options">
        <div className="insumos">
          <Button type="secondary" onClick={() => router.push("/insumos")}>
            Insumos
          </Button>
        </div>
        <div className="hospitals">
          <Button type="secondary" onClick={handleHospital}>
            Hospitales
          </Button>
          {showHospitales ? (
            <Button onClick={handleShowCrearHospital}>Crear hospital</Button>
          ) : null}
          {showCrearHospital ? (
            <HospitalForm
              onActualizar={() => {
                setActualizar((prev) => prev + 1);
              }}
            />
          ) : null}
          {showHospitales ? (
            <>
              <div className="table_header table_row_hospitales">
                <p>
                  <strong>Nombre</strong>
                </p>
                <p>
                  <strong>Numero casos covid último mes</strong>
                </p>

                <p>
                  <strong>Borrar</strong>
                </p>
              </div>
              {hospitales
                .filter((item: any) => !item.borrado)
                .map((hospital: any, index: number) => {
                  return (
                    <HospitalCard
                      key={index}
                      item={hospital}
                      onEliminar={() =>
                        handleBorrarHospital(hospital.hospitalId)
                      }
                    />
                  );
                })}
            </>
          ) : null}
        </div>

        <Button type="secondary" onClick={() => router.push("/entregas")}>
          Entregados
        </Button>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
