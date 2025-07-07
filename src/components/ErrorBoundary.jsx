import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Puedes enviar el error a un servicio externo aquí
    console.error("ErrorBoundary atrapó un error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Algo salió mal.</h2>;
    }
    return this.props.children;
  }
}