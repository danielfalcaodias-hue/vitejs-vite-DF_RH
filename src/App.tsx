import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Lock, LayoutDashboard, Users, Briefcase, Plus, TrendingUp, Search, Bell } from 'lucide-react';

// --- PROTEÇÃO ---
const Gatekeeper = ({ children }: { children: React.ReactNode }) => {
  const [senha, setSenha] = useState('');
  const [autorizado, setAutorizado] = useState(false);
  const verificar = (e: React.FormEvent) => {
    e.preventDefault();
    if (senha === 'Workview2026') setAutorizado(true);
    else alert('Senha incorreta!');
  };

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={verificar} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center font-sans">
          <Lock className="text-blue-600 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Workview Portal</h1>
          <input type="password" onChange={(e) => setSenha(e.target.value)} className="w-full px-4 py-3 border rounded-lg mb-4 text-center" placeholder="Senha" />
          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Entrar</button>
        </form>
      </div>
    );
  }
  return <>{children}</>;
};

// --- PORTAL COM DESIGN CORRIGIDO ---
const MainDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Menu Lateral Fixo */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-10 px-2 font-bold text-xl uppercase tracking-wider">
          <Briefcase className="text-blue-500" /> Workview
        </div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl cursor-pointer shadow-lg shadow-blue-900/20"><LayoutDashboard size={20}/> Dashboard</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl cursor-pointer transition-all"><Users size={20}/> Candidatos</div>
          <div className="flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 rounded-xl cursor-pointer transition-all"><Briefcase size={20}/> Vagas</div>
        </nav>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Barra Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div className="relative w-96 hidden sm:block">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 text-sm focus:ring-2 focus:ring-blue-500" placeholder="Procurar candidato..." />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-slate-400 cursor-pointer" size={20} />
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">DF</div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Gestão de Talentos em Tempo Real</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all">
                <Plus size={20} /> Nova Vaga
              </button>
            </div>

            {/* Cartões de Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Total Candidatos', val: '1,284', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Vagas Ativas', val: '12', icon: <Briefcase />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Score IA Médio', val: '88%', icon: <TrendingUp />, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className={`${card.bg} ${card.color} p-4 rounded-xl`}>{card.icon}</div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                    <p className="text-2xl font-black text-slate-900">{card.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela Profissional */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h2 className="font-bold text-slate-800">Candidaturas Recentes</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                    <tr>
                      <th className="px-6 py-4">Nome</th>
                      <th className="px-6 py-4">Vaga</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Pontuação IA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">Ana Martins</td>
                      <td className="px-6 py-4 text-slate-500">UX Designer Senior</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">Em Triagem</span></td>
                      <td className="px-6 py-4 font-black text-blue-600 italic">98/100</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">Pedro Santos</td>
                      <td className="px-6 py-4 text-slate-500">Frontend Developer</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-black uppercase">Entrevista</span></td>
                      <td className="px-6 py-4 font-black text-purple-600 italic">92/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Gatekeeper>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Gatekeeper>
    </BrowserRouter>
  );
}