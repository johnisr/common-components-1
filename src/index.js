import "./index.scss";
import styles from "./constants/index";

import Modal from "./Modal/Modal";
import CustomTable from "./Table/CustomTable";
import Datatable from "./Table/Datatable";
import Title from "./Title/Title";
import ReactLoader from "./Loader/ReactLoader";
import Page from "./Page/Page";
import Panel from "./Panel/Panel";
import Button from "./Button/Button";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import NavBar from "./NavBar/NavBar";
import Sidebar from "./Sidebar/Sidebar";
import Form from "./Form/Form";
import ControlledSelectInput from "./Form/FormInputs/SelectInput/SelectInput";
import TextInput from "./Form/FormInputs/TextInput";
import ControlledDateInput from "./Form/FormInputs/DateInput/DateInput";
import FormInputWrapper from "./Form/FormInputs/FormInputWrapper";
import FormButton from "./Form/FormButton";

import useSidebar from "./Sidebar/useSidebar";
import useForm from "./utils/hooks/useForm";

export {
  CustomTable,
  Datatable,
  Title,
  ReactLoader,
  Page,
  Panel,
  Button,
  Breadcrumbs,
  NavBar,
  Sidebar,
  useSidebar,
  Modal,
  styles,
  Form,
  FormButton,
  ControlledSelectInput as SelectInput,
  ControlledDateInput as DateInput,
  TextInput,
  FormInputWrapper,
  useForm,
};

export default {
  CustomTable,
  Datatable,
  Title,
  ReactLoader,
  Page,
  Panel,
  Button,
  Breadcrumbs,
  NavBar,
  Sidebar,
  useSidebar,
  Modal,
  styles,
  Form,
  FormButton,
  SelectInput: ControlledSelectInput,
  DateInput: ControlledDateInput,
  TextInput,
  useForm,
  FormInputWrapper,
};
