import * as React from 'react';
import styles from './PaisesIntergrupo.module.scss';
import { IPaisesIntergrupoProps } from './IPaisesIntergrupoProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { IPais } from '../../../modelo/IPais';
import ModalPaises from '../../../controles/modalPaises';

export interface IReactSpfxState {
  paises: Array<IPais>;
  showModal: boolean;
}

export default class PaisesIntergrupo extends React.Component<IPaisesIntergrupoProps, IReactSpfxState> {
//Propiedades
  private arrayPaises: IPais[] = [];
  private pais: IPais;

//Constructor
  constructor(props: IPaisesIntergrupoProps, context: any) {
    super(props, context);
    this.cargarCssJs();
    this.inicializarEstado();
    this.inicializarEventsHandler();
  }
//inicializador de varibales de estado
  private inicializarEstado() {
    this.state = {
      paises: [],
      showModal: false
    };
  }
  //Inicializar disparadores de eventos
  private inicializarEventsHandler() {
    this.onOpenModal = this.onOpenModal.bind(this);
  }
//carga insumos de css y js por medio de cdn
  private cargarCssJs() {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    SPComponentLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', { globalExportsName: 'jQuery' }).then((_jQuery: any): void => {
      SPComponentLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js', { globalExportsName: 'jQuery' }).then((): void => {
      });
    });
  }
//primer metodo que carga el componente
  public componentDidMount() {
    this.consultarPaises();
  }
//metodo que consume el API y transforma los resultados a entidad de paises
  public consultarPaises() {
    fetch('https://restcountries.eu/rest/v2/all').then(
      results => {
        return results.json();
      }).then(json => {
        this.retornarPaises(json);
        this.establecerEstadoPaises(this.arrayPaises);
      });
  }
//establece paises variable estado
  private establecerEstadoPaises(paises: IPais[]) {
    this.setState({
      paises: paises
    });
  }
//Retornar entidad paises
  public retornarPaises(respuestapaises: any): IPais[] {
    respuestapaises.map((item: any) => {
      this.arrayPaises.push({
        nombre: item.name,
        capital: item.capital,
        bandera: item.flag,
        moneda: item.currencies[0].name,
        region:item.region,
        lenguaje:item.languages[0].name,
        cioc:item.cioc
      });
    });
    return this.arrayPaises;
  }
  //metodo para abrir modal
  private onOpenModal = (item, e): void => {
    this.pais = item;
    e.preventDefault();
    this.setState({ showModal: true });
  }
  //metodo para cerrar el modal
  private onCloseModal = () => {
    this.setState({ showModal: false });
  }

//Renderizado del HTML
  public render(): React.ReactElement<IReactSpfxState> {
    const { showModal: open } = this.state;
    return (
      <section>
        <div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>País</th>
                  <th>Idioma</th>
                  <th>Moneda</th>
                  <th>Bandera</th>
                </tr>
              </thead>
              <tbody>
                {this.arrayPaises.map((pais, index) => {
                  return (
                    <tr key={pais.nombre}>
                      <td><a className={styles.button} onClick={(e) => this.onOpenModal(pais, e)}>
                        <span className={styles.label}>{pais.nombre}</span>
                      </a>
                      </td>
                      <td>{pais.lenguaje}</td>
                      <td>{pais.moneda}</td>
                      <td><img style={{width: '50px'}} className={styles.bandera} src={pais.bandera}></img></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ModalPaises
              open={open}
              handleCloseModal={this.onCloseModal}
              pais={this.pais}
            ></ModalPaises>
          </div>
        </div>
      </section>
    );
  }
}