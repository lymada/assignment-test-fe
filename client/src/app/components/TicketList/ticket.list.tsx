import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusFilter from "../TicketFilter/ticket.filter";
import { useTickets } from "../../context/ticket.context";
import styles from "./ticket.list.module.css";
import Ticket from "../../models/ticket";

const TicketList: React.FC = () => {
  const [completionFilter, setCompletionFilter] = useState<boolean | null>(
    null
  );
  const [assigneeMap, setAssigneeMap] = useState<Record<number, string>>({});
  const [userFilter, setUserFilter] = useState<number | null>(null);
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [updatingTicketId, setUpdatingTicketId] = useState<number | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { users, loading, error, filterTicketsByCompletion, completeTicket, incompleteTicket } = useTickets();

  const filterTicketsByUser = (tickets: Ticket[]) => {
    if (userFilter === null) return tickets;
    if (userFilter === -1)
      return tickets.filter((ticket) => ticket.assigneeId === null);
    return tickets.filter((ticket) => ticket.assigneeId === userFilter);
  };

  const statusFilteredTickets = filterTicketsByCompletion(completionFilter);
  const filteredTickets = filterTicketsByUser(statusFilteredTickets);

  useEffect(() => {
    const userMap: Record<number, string> = {};
    users.forEach((user) => {
      userMap[user.id] = user.name;
    });
    setAssigneeMap(userMap);
  }, [users]);

  useEffect(() => {
    if (!loading && isInitialLoad) {
      setIsInitialLoad(false);
      setIsPageLoading(false);
    }
  }, [loading, isInitialLoad]);

  const sortedFilteredTickets = [...filteredTickets].sort((a, b) => {
    return b.id - a.id;
  });

  const handleStatusChange = async (ticketId: number, completed: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setUpdatingTicketId(ticketId);
      
      if (completed) {
        await completeTicket(ticketId);
      } else {
        await incompleteTicket(ticketId);
      }
    } catch (error) {
      console.error("Failed to update ticket status", error);
    } finally {
      setUpdatingTicketId(null);
    }
  };

  if (isPageLoading) {
    return (
      <div className={styles["pageContainer"]}>
        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <h1 className={styles["title"]}>Ticket Manager</h1>
            <button className={styles["addButton"]} disabled>
              Add New Ticket
            </button>
          </div>
          <div className={styles["loadingContainer"]}>
            <div className={styles["loadingSpinner"]}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["pageContainer"]}>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1 className={styles["title"]}>Ticket Manager</h1>
          <button
            onClick={() => navigate("/ticket/new")}
            className={styles["addButton"]}
          >
            Add New Ticket
          </button>
        </div>

        <StatusFilter
          selectedStatus={completionFilter}
          onStatusChange={setCompletionFilter}
          users={users}
          selectedUser={userFilter}
          onUserChange={setUserFilter}
        />

        {error && (
          <div className={styles["errorAlert"]} role="alert">
            <strong className={styles["errorTitle"]}>Error:</strong>
            <span> {error}</span>
          </div>
        )}

        <div className={styles["ticketListContainer"]}>
          <div className={styles["ticketList"]} data-testid="ticket-list">
            {filteredTickets.length === 0 ? (
              <div className={styles["emptyMessage"]}>
                No tickets found. Try changing the filter or add a new ticket.
              </div>
            ) : (
              sortedFilteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={styles["ticketItem"]}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  data-testid="ticket-item"
                >
                  <div className={styles["ticketHeader"]}>
                    <div className={styles["ticketDescription"]}>
                      {ticket.description}
                    </div>
                    <div className={styles["statusContainer"]}>
                      <span
                        className={`${styles["statusBadge"]} ${
                          ticket.completed
                            ? styles["statusCompleted"]
                            : styles["statusIncomplete"]
                        }`}
                      >
                        {ticket.completed ? "Completed" : "Incomplete"}
                      </span>
                    </div>
                  </div>
                  <div className={styles["ticketFooter"]}>
                    <div className={styles["assigneeInfo"]}>
                      {ticket.assigneeId
                        ? `Assigned to: ${
                            assigneeMap[ticket.assigneeId] || "Loading..."
                          }`
                        : "Unassigned"}
                    </div>
                    <div className={styles["completionContainer"]}>
                      <label className={styles["completionLabel"]}>Mark as completed</label>
                      {updatingTicketId === ticket.id ? (
                        <div className={styles["smallSpinner"]}></div>
                      ) : (
                        <input
                          type="checkbox"
                          checked={ticket.completed}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.checked, e.nativeEvent as unknown as React.MouseEvent)}
                          onClick={(e) => e.stopPropagation()}
                          className={styles["statusCheckbox"]}
                          data-testid="status-checkbox"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;