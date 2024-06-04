import { EintragResource } from "../Resources";

export function Eintrag(props: {eintrag: EintragResource}) {
    const eintrag = props.eintrag;

    return (
        <table>
        <tbody>
            <tr>
              <th>Getränk</th>
              <td>{eintrag.getraenk}</td>
            </tr>
            <tr>
              <th>Menge</th>
              <td>{eintrag.menge} ml</td>
            </tr>
            <tr>
              <th>Kommentar</th>
              <td>{eintrag.kommentar}</td>
            </tr>
            <tr>
              <th>Erstellt am</th>
              <td>{eintrag.createdAt}</td>
            </tr>
            <tr>
              <th>Erstellt von</th>
              <td>{eintrag.erstellerName}</td>
            </tr>
        </tbody>
    </table>
    )
}