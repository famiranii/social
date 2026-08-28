import type * as LType from "leaflet";

export function createMyLocationIcon(
  L: typeof LType,
): LType.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(66, 133, 244, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #4285f4;
          border: 4px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          position: relative;
        ">
          <div style="
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "></div>
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}